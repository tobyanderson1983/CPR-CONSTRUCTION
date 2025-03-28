//Employee.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phoneNumber: { type: String, required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Ensures 10-digit phone number
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
  username: { type: String, required: true, unique: true, trim: true, lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Email validation
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

// Pre-save middleware to hash the password before storing it
EmployeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
