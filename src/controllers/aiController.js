const { textToRules, suggestMessages, summarizePerformance } = require('../utils/aiUtils');

exports.naturalToRules = async (req, res) => {
  const { prompt } = req.body;
  const rules = await textToRules(prompt);
  res.json({ rules });
};

exports.suggestMessages = async (req, res) => {
  const { objective } = req.body;
  const variants = await suggestMessages(objective);
  res.json({ variants });
};

exports.summarizePerformance = async (req, res) => {
  const { stats } = req.body;
  const summary = await summarizePerformance(stats);
  res.json({ summary });
};