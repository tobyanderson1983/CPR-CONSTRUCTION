//routes/customerRoutes.js

const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const Customer = require('../models/Customer');
const router = express.Router();
const upload = multer();

// CREATE customer and service request -- IN USE
router.post('/', upload.none(), async (req, res) => {
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

//get all customers services route -- IN USE
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
  

// GET one CUSTOMER -----NOT IN USE    
router.get('/:id', async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.params.id);
//     if (!admin) return res.status(404).json({ error: 'Admin not found' });
//     res.json(admin);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
});

// UPDATE a customer -------NOT IN USE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Admin not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE customer -----NOT IN USE
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