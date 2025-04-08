//server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Import Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);//add routes to authRoutes

//lets try making seperate admin routes----------------------------------------------------------------
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admins', adminRoutes);//add routes to adminRoutes

//-----------------------------------------------------------------------------------------------------

// Start Server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
