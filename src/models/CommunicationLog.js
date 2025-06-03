const mongoose = require('mongoose');

const CommunicationLogSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  message: String,
  status: { type: String, enum: ['SENT', 'FAILED'], default: 'SENT' },
  vendorReceiptId: String,
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CommunicationLog', CommunicationLogSchema);