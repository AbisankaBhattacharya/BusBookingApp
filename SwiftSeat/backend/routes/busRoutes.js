const express = require('express');
const router = express.Router();

const {
  createBus,
  getSeats,
  bookSeat,
  getAllBuses // ⬅️ Add this if listing buses in dashboard
} = require('../controllers/busController');

const auth = require('../middleware/authMiddleware'); // ✅ Token verification middleware

// ✅ Protected Routes (Authorization: Bearer <token>)
router.post('/create', auth, createBus);              // Admin: Create a new bus
router.get('/', auth, getAllBuses);                   // ✅ Get all buses (for dashboard dropdown or list)
router.get('/:busId/seats', auth, getSeats);          // Get seat info for specific bus
router.post('/:busId/book', auth, bookSeat);          // Book a specific seat

module.exports = router;
