const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Service = require('../models/Service'); // Import the Service model
const Admin = require('../models/Admin');
//
const Customer = require('../models/Customer');
//-----
const router = express.Router();

//???
//const { createService, getServices, updateService } = require('../controllers/services.controller');
///------------------------------

// Login 
router.post('/login', async (req, res) => {
 
  const { username, password } = req.body;
  console.log(req.body, username, password)

  try {
    let user = await Admin.findOne({ username });
    let role = 'admin';

    if (!user) {
      user = await Employee.findOne({ username });
      role = 'employee';
    }

    if (!user) {
      user = await Service.findOne({ username });
      role = 'service';
    }

    if (!user){
      console.log('at Customer')
      user = await Customer.findOne({ username });
      console.log(user); //null
      role = 'customer';
    }

    if (!user) return res.status(400).json({ message: 'User not found' });
   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ token, username: user.username, role, firstName: user.firstName, lastName: user.lastName });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Dashboard Route
router.get('/adminDashboard', (req, res) => {
  // Simulate a service request retrieval
  const services = [{ name: 'Plumbing', status: 'Pending' }];
  res.status(200).json({ services });
});

// Save a new service request
// router.post('/services', async (req, res) => {
//   try {
//     console.log("Received service request:", req.body);
    
//     const newService = new Service(req.body);
//     await newService.save();
    
//     res.status(201).json({ message: "Service request submitted successfully", data: newService });
//   } catch (err) {
//     console.error("Error saving service request:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// ✅ GET: Retrieve all service requests
// router.get('/services', async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.status(200).json(services);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

//new get services route
router.get('/services', async (req, res) => {
  const { email } = req.query;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    
    res.status(200).json(customer.serviceRequests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create new administrator
router.post('/admin', async (req, res) => {

  try {
    const { firstName, lastName, streetAddress, city, state, zipCode, phoneNumber, username, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if the username (email) is already taken
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create new admin
    const newAdmin = new Admin({
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

    await newAdmin.save();
    res.status(201).json({ message: 'Administrator created successfully' });

  } catch (error) {
    console.error('Error creating administrator:', error);
    res.status(500).json({ error: 'Server error' });
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

router.post('/services', async (req, res) => {
  console.log('/services')
  try {
    const { firstName, lastName, streetAddress, city, state, zipCode, phoneNumber, username, password, serviceType, description } = req.body;

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

//-----------------------------------------

module.exports = router;
