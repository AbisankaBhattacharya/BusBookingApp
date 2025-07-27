const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger to show incoming requests in terminal
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Test Route
app.get('/', (req, res) => {
  res.send('✅ SwiftSeat Backend is running');
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bus', require('./routes/busRoutes'));

// MongoDB connection and server start
const PORT = 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
