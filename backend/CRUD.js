// // just a file with examples of CRUD

// const express = require('express');
// const router = express.Router();
// const ServiceRequest = require('../models/ServiceRequest'); // adjust path if needed

// // CREATE a new service request
// router.post('/', async (req, res) => {
//   try {
//     const newRequest = new ServiceRequest(req.body);
//     const savedRequest = await newRequest.save();
//     res.status(201).json(savedRequest);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // READ all service requests
// router.get('/', async (req, res) => {
//   try {
//     const requests = await ServiceRequest.find().sort({ createdAt: -1 });
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // READ a single service request by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const request = await ServiceRequest.findById(req.params.id);
//     if (!request) return res.status(404).json({ message: 'Not found' });
//     res.json(request);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // UPDATE a service request
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedRequest = await ServiceRequest.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedRequest);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // DELETE a service request
// router.delete('/:id', async (req, res) => {
//   try {
//     await ServiceRequest.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
