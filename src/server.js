require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const startConsumer = require('./pubsub/consumer');
const PORT = process.env.PORT || 5001; // or 5001, but only one!

const redisClient = require('./redis');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.get('/api/dashboard-stats', (req, res) => {
  res.json({ customers: 0, invoices: 0, revenue: 0 });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startConsumer();
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));