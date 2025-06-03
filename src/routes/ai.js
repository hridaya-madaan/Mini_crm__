const express = require('express');
const { naturalToRules, suggestMessages, summarizePerformance } = require('../controllers/aiController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/segment', async (req, res) => {

router.post('/rule-parse', authenticate, naturalToRules);
router.post('/suggest-message', authenticate, suggestMessages);
router.post('/summarize', authenticate, summarizePerformance);

  res.json({ rules: [] }); // Implement
});
router.post('/message', async (req, res) => {
  res.json({ variants: [] }); // Implement
});

module.exports = router;