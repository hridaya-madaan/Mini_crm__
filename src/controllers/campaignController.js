const Campaign = require('../models/Campaign');
const CommunicationLog = require('../models/CommunicationLog');
const Customer = require('../models/Customer');
const publishEvent = require('../pubsub/publisher');

exports.createCampaign = async (req, res) => {
  // 1. Save campaign draft
  const { name, rules, messageVariants, selectedMessage } = req.body;
  // 2. Apply rules to preview audience
  let audience = await Customer.find(rules); // You may want to use a rule builder for advanced logic
  const campaign = new Campaign({
    creator: req.user._id,
    name,
    rules,
    audiencePreview: audience.length,
    messageVariants,
    selectedMessage,
    status: 'running'
  });
  await campaign.save();
  // 3. Queue for delivery
  await publishEvent('crm_events', {
    type: 'campaign_send',
    payload: JSON.stringify({
      campaignId: campaign._id,
      message: selectedMessage,
      customerIds: audience.map(c => c._id)
    })
  });
  res.json({ campaign, audienceSize: audience.length });
};

exports.getCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({ creator: req.user._id }).sort({ createdAt: -1 });
  res.json(campaigns);
};

exports.getStats = async (req, res) => {
  // Provide dashboard stats: total customers, invoices, revenue, etc.
  const totalCustomers = await Customer.countDocuments();
  const totalOrders = await require('../models/Order').countDocuments();
  const revenue = await require('../models/Order').aggregate([{ $group: { _id: null, sum: { $sum: '$amount' } } }]);
  res.json({
    totalCustomers,
    totalOrders,
    revenue: revenue[0]?.sum || 0
  });
};

exports.deliveryReceipt = async (req, res) => {
  const { communicationLogId, status } = req.body;
  await CommunicationLog.findByIdAndUpdate(communicationLogId, { status, deliveredAt: new Date() });
  res.json({ updated: true });
};