const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rules: Object,
  audienceSize: Number,
  messages: [{
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    message: String,
    status: { type: String, enum: ['SENT', 'FAILED'], default: 'SENT' },
    vendorReceiptId: String,
  }],
  summary: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', CampaignSchema);