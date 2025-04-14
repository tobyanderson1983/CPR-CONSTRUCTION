const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee'); 
const Admin = require('../models/Admin');
const Customer = require('../models/Customer');
const router = express.Router();


// Login --confirmed use
router.post('/', async (req, res) => {
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


module.exports = router;
