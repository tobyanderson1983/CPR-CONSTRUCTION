// routes/adminRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const router = express.Router();

// CREATE admin --- IN USE
router.post('/', async (req, res) => {

  const {
    firstName, lastName, streetAddress, city, state,
    zipCode, phoneNumber, username, password
  } = req.body;

  try {
    if (!password || password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const existing = await Admin.findOne({ username });
    if (existing)
      return res.status(400).json({ error: 'Email already in use' });

    const newAdmin = new Admin({
      firstName, lastName, streetAddress, city, state,
      zipCode, phoneNumber, username, password
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    console.error('Create admin error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


//get all admins 5 at a time --- IN USE
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const admins = await Admin.find();

    const allAdmins = admins.map(admin => ({
      ...admin.toObject(),
      firstName: admin.firstName,
      lastName: admin.lastName
    }));

    const paginatedAdmins = allAdmins.slice(skip, skip + limit);

    res.status(200).json({
      admins: paginatedAdmins,
      totalAdmins: allAdmins.length,
    });

  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Failed to retrieve admins' });
  }
});


// GET one admin -----NOT IN USE    
router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE admin ------- IN USE
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ error: 'Admin not found' });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });
router.put('/:id', async (req, res) => {
  try {
    const {
      firstName, lastName, streetAddress, city, state,
      zipCode, phoneNumber, username, password, confirmPassword
    } = req.body;

    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    // Update fields
    admin.firstName = firstName;
    admin.lastName = lastName;
    admin.streetAddress = streetAddress;
    admin.city = city;
    admin.state = state;
    admin.zipCode = zipCode;
    admin.phoneNumber = phoneNumber;
    admin.username = username;

    // Optional: If password is provided, hash and update it
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    await admin.save();
    res.status(200).json({ message: 'Admin updated successfully' });

  } catch (err) {
    console.error('Update admin error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// DELETE admin ----- IN USE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Admin.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Admin not found' });
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
