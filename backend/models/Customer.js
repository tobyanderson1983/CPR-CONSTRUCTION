//Customer.js

const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'In Progress'], default: 'Pending' },
  dateRequested: { type: Date, default: Date.now },
  notes: { type: String },
  // role: {type: String, default: 'customer'}
});

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  username: { type: String, required: true, unique: true }, //email
  password: { type: String, required: true, select: false },
  role: {type: String },
  serviceRequests: [ServiceRequestSchema]
});

module.exports = mongoose.model('Customer', CustomerSchema);
