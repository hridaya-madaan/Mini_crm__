const CommunicationLog = require('../models/CommunicationLog');

// Vendor receipt endpoint
exports.receiveReceipt = async (req, res) => {
  const { communicationLogId, status } = req.body;
  await CommunicationLog.findByIdAndUpdate(communicationLogId, { status, deliveredAt: new Date() });
  res.json({ ok: true });
};