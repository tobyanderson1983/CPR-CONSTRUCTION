//routes/customerRoutes.js

const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const router = express.Router();
const upload = multer();

// CREATE customer and service request -- IN USE
router.post('/', upload.none(), async (req, res) => {
  try {
    const { firstName, lastName, streetAddress, city, state, zipCode, phoneNumber, username, password, serviceType, description, role } = req.body;
    let customer = await Customer.findOne({ username });

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

//get/READ all services 5 at a time --- IN USE
router.get('/', async (req, res) => {
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


// get a single customers service data --- sent from handleSearchService on the AdminDashboard -- IN USE
router.get('/oneCustomer', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const { username, firstName, lastName } = req.query;

    if (!username && (!firstName || !lastName)) {
      return res.status(400).json({ message: "Please provide a username or both firstName and lastName." });
    }

    // Search by username or firstName + lastName
    let customer;
    if (username) {
      customer = await Customer.findOne({ username });
    } else {
      customer = await Customer.findOne({ firstName, lastName });
    }

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const allServices = customer.serviceRequests.map(service => ({
      ...service.toObject(),
      firstName: customer.firstName,
      lastName: customer.lastName
    }));

    if (customer.serviceRequests.length) {
      res.status(200).json({ services: allServices });
    } else {
      res.status(200).json({ services: customer });
    }

  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE a customer -------IN USE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Admin not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

//edit service  ---- IN USE
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

// Get full customer data by service ID 
router.get('/service/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;

    const customer = await Customer.findOne({
      'serviceRequests._id': serviceId
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer with this service not found" });
    }

    const matchedService = customer.serviceRequests.find(
      (service) => service._id.toString() === serviceId
    );

    if (!matchedService) {
      return res.status(404).json({ message: "Service not found in customer's data" });
    }

    res.status(200).json({
      customer: {
        _id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        streetAddress: customer.streetAddress,
        city: customer.city,
        state: customer.state,
        zipCode: customer.zipCode,
        phoneNumber: customer.phoneNumber,
        username: customer.username,
      },
      service: matchedService
    });

  } catch (err) {
    console.error("Error fetching customer by service ID:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//DELETE a customer's SERVICE REQUEST by id -- IN USE
router.delete('/service/:serviceId', async (req, res) => {
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