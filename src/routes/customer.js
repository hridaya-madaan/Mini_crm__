const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

// POST /api/customers - Add a customer (ingestion API)
router.post('/', async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
});

// GET /api/customers - List all customers
router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

module.exports = router;