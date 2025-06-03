const Order = require('../models/Order');
const publishEvent = require('../pubsub/publisher');

exports.ingestOrders = async (req, res) => {
  await publishEvent('crm_events', { type: 'order_ingest', payload: JSON.stringify(req.body.orders) });
  res.json({ status: 'queued' });
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate('customer');
  res.json(orders);
};

exports.addOrder = async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
};