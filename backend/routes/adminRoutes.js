// routes/adminRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const router = express.Router();

// CREATE admin --- IN USE
router.post('/', async (req, res) => {
  const {
    firstName, lastName, streetAddress, city, state,
    zipCode, phoneNumber, username, password, confirmPassword
  } = req.body;

  try {
    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Passwords do not match' });

    const existing = await Admin.findOne({ username });
    if (existing)
      return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      firstName, lastName, streetAddress, city, state,
      zipCode, phoneNumber, username, password: hashedPassword
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
  console.log('at get all admins', req.body)
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

// UPDATE admin -------NOT IN USE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Admin not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE admin -----NOT IN USE
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
