const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.textToRules = async (prompt) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: `Convert this CRM segment query to logical rules: "${prompt}"` }]
  });
  return completion.choices[0]?.message?.content;
};

exports.suggestMessages = async (objective) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: `Suggest 3 engaging campaign messages for: "${objective}". List as bullet points.` }]
  });
  return completion.choices[0]?.message?.content.split('\n').filter(Boolean);
};

exports.summarizePerformance = async (stats) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "user",
      content: `Summarize this campaign data for a business user: ${JSON.stringify(stats)}`
    }]
  });
  return completion.choices[0]?.message?.content;
};