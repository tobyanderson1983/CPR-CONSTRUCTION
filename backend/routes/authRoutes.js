const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
//const Service = require('../models/Service'); 
const Admin = require('../models/Admin');
const Customer = require('../models/Customer');
const router = express.Router();


// Login --confirmed use
router.post('/login', async (req, res) => {
 
  const { username, password } = req.body;

  try {
  
    let user = await Admin.findOne({ username });
    let role = 'admin';

    if (!user) {
      user = await Employee.findOne({ username });
      role = 'employee';
    }

    if (!user) {
      user = await Customer.findOne({ username });
      role = 'customer';
    }
   
    if (!user) return res.status(400).json({ message: 'User not found' });
   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role, username: user.email || user.username }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.status(200).json({ token, username: user.username, role, firstName: user.firstName, lastName: user.lastName });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//added customer routes


//get all services 5 at a time
router.get('/services', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default to 5 items per page
    const skip = (page - 1) * limit;

    const customers = await Customer.find();
    
    const allServices = customers.flatMap(customer => 
      customer.serviceRequests.map(service => ({
        ...service.toObject(),
        firstName: customer.firstName,
        lastName: customer.lastName
      }))
    );

    const paginatedServices = allServices.slice(skip, skip + limit);

    res.status(200).json({
      services: paginatedServices,
      totalServices: allServices.length, // Total count for frontend navigation
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to retrieve services' });
  }
});

//edit service 
router.put('/services/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { serviceType, description, status } = req.body;

    // Find the customer that has this service request
    const customer = await Customer.findOne({ "serviceRequests._id": serviceId });

    if (!customer) {
      return res.status(404).json({ message: "Service request not found" });
    }

    // Update the specific service request
    const service = customer.serviceRequests.id(serviceId);
    service.serviceType = serviceType;
    service.description = description;
    service.status = status;

    await customer.save();
    res.status(200).json({ message: "Service request updated successfully" });

  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: "Server error" });
  }
});

//get a customer's services
// Get a customer by username (assuming you want their full profile and services)
router.get('/customerServices', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const user = await Customer.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Returned user: ', user);
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//delete service
router.delete('/services/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;

    const customer = await Customer.findOne({ "serviceRequests._id": serviceId });

    if (!customer) {
      return res.status(404).json({ message: "Service request not found" });
    }

    // Remove the service request
    customer.serviceRequests = customer.serviceRequests.filter(service => service._id.toString() !== serviceId);
    
    await customer.save();
    res.status(200).json({ message: "Service request deleted successfully" });

  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
