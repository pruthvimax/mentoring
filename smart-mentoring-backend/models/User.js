const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String },
  department: { type: String },
  role: { type: String, enum: ['student','staff','hod'], required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
