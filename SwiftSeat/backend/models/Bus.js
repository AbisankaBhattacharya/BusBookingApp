const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNo: Number,
  booked: { type: Boolean, default: false },
  userEmail: { type: String, default: '' }
});

const busSchema = new mongoose.Schema({
  busName: String,
  seats: [seatSchema]
});

module.exports = mongoose.model('Bus', busSchema);
