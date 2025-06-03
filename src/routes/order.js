const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// POST /api/orders - Create order
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders - List orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find().populate('customer', 'name email');
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;