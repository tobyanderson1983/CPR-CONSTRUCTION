//authRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json(req.body );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Login User

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username});
        if (!user) return res.status(400).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Dashboard Route
router.get('/dashboard', (req, res) => {
  // Simulate a service request retrieval
  const services = [{ name: 'Plumbing', status: 'Pending' }];
  res.status(200).json({ services });
});

module.exports = router;
