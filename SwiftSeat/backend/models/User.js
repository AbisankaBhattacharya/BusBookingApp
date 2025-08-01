const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  password: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
