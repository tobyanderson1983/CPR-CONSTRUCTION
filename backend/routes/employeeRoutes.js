//employeeRoutes.js

//routes/customerRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const router = express.Router();

// CREATE employee -- IN USE
router.post('/', async (req, res) => {
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

//get all employees route -- NOT IN USE
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
  

// GET one Employee -----NOT IN USE    
router.get('/:id', async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.params.id);
//     if (!admin) return res.status(404).json({ error: 'Admin not found' });
//     res.json(admin);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
});

// UPDATE an employee -------NOT IN USE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Admin not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE employee -----NOT IN USE
router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await Admin.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: 'Admin not found' });
//     res.json({ message: 'Admin deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
});

module.exports = router;