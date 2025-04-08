const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
//const Service = require('../models/Service'); 
// const Admin = require('../models/Admin');
const Customer = require('../models/Customer');
const router = express.Router();
const upload = multer();

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



//new get services route
router.get('/customer', async (req, res) => {
  console.log('at get customer route')
  
  try {
    // Check if Authorization header is provided
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract token and verify it
    const token = authHeader.split(" ")[1]; // Get the actual token part
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
    const username = decoded.username; // Extract username from token
    
    if (!username) {
      return res.status(400).json({ message: "Invalid token: No username found" });
    }

    // Find customer by username
    const customer = await Customer.findOne({ username }); // Ensure it's email if stored as such
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ services: customer.serviceRequests });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



//create new employee
router.post('/employee', async (req, res) => {
  console.log('new employee route');
  try {
    const { firstName, lastName, streetAddress, city, state, zipCode, phoneNumber, username, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if the username (email) is already taken
    const existingEmployee = await Employee.findOne({ username });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Email already in use. Does this person have admin privileges or a customer?' });
    }

    // Create new employee
    const newEmployee = new Employee({
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      username,
      password,
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully' });

  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//added customer routes

router.post('/services', upload.none(), async (req, res) => {
    console.log('at services route')
  
  try {
    const { firstName, lastName, streetAddress, city, state, zipCode, phoneNumber, username, password, serviceType, description, role } = req.body;
    let customer = await Customer.findOne({ username });

    console.log(req.body)

    if (!customer) {
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      customer = new Customer({
        firstName, lastName, streetAddress, city, state, phoneNumber, username, zipCode, password: hashedPassword,
        serviceRequests: [{ serviceType, description }]
      });

      await customer.save();
      return res.status(201).json({ message: "Customer profile and service request created successfully" });
    }

    customer.serviceRequests.unshift({ serviceType, description });
    await customer.save();
    
    res.status(200).json({ message: "Service request added successfully" });
  } catch (err) {
    console.error("Error processing service request:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

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
