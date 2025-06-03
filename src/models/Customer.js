const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  totalSpend: { type: Number, default: 0 },
  visits: { type: Number, default: 0 },
  lastActive: Date,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Customer', CustomerSchema);