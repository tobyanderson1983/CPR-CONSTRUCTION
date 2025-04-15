//employeeRoutes.js

//routes/customerRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const router = express.Router();

// CREATE employee -- IN USE
router.post('/', async (req, res) => {

  const {
    firstName, lastName, streetAddress, city, state,
    zipCode, phoneNumber, username, password
  } = req.body;

  try {
    if (!password || password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const existing = await Employee.findOne({ username });
    if (existing)
      return res.status(400).json({ error: 'Email already in use' });

    const newEmployee = new Employee({
      firstName, lastName, streetAddress, city, state,
      zipCode, phoneNumber, username, password
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (err) {
    console.error('Create employee error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


//get all employees 5 at a time --- IN USE
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const employees = await Employee.find();

    const allEmployees = employees.map(employee => ({
      ...employee.toObject(),
      firstName: employee.firstName,
      lastName: employee.lastName
    }));

    const paginatedEmployees = allEmployees.slice(skip, skip + limit);

    res.status(200).json({
      employees: paginatedEmployees,
      totalEmployees: allEmployees.length,
    });

  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to retrieve employees' });
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


// UPDATE employee ------- IN USE
router.put('/:id', async (req, res) => {
  try {
    const {
      firstName, lastName, streetAddress, city, state,
      zipCode, phoneNumber, username, password, confirmPassword
    } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!Employee) return res.status(404).json({ error: 'Employee not found' });

    // Update fields
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.streetAddress = streetAddress;
    employee.city = city;
    employee.state = state;
    employee.zipCode = zipCode;
    employee.phoneNumber = phoneNumber;
    employee.username = username;

    // Optional: If password is provided, hash and update it
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
      employee.password = password;
    }

    await employee.save();
    res.status(200).json({ message: 'Employee updated successfully' });

  } catch (err) {
    console.error('Update employee error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE employee -----IN USE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;