const express = require('express');
const Campaign = require('../models/Campaign');
const router = express.Router();

// POST /api/campaigns - Create campaign with rules, audience, etc.
router.post('/', async (req, res, next) => {
  try {
    // Implement: build audience, send messages via pub-sub, log communications
    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    next(err);
  }
});

// GET /api/campaigns - List campaigns
router.get('/', async (req, res, next) => {
  try {
    const campaigns = await Campaign.find().populate('createdBy', 'name email');
    res.json(campaigns);
  } catch (err) {
    next(err);
  }
});

module.exports = router;