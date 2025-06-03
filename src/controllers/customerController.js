const Customer = require('../models/Customer');
const publishEvent = require('../pubsub/publisher');

exports.ingestCustomers = async (req, res) => {
  // Validate and queue for async ingestion
  await publishEvent('crm_events', { type: 'customer_ingest', payload: JSON.stringify(req.body.customers) });
  res.json({ status: 'queued' });
};

exports.getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

exports.addCustomer = async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
};