const redis = require('../config/redis');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Campaign = require('../models/Campaign');
const CommunicationLog = require('../models/CommunicationLog');
const sendSMS = require('../utils/sendSMS');

// Runs continuously to process messages (run in a worker process)
async function startConsumer() {
  let lastId = '0';
  console.log("Consumer started...");
  while (true) {
    const res = await redis.xread('BLOCK', 0, 'STREAMS', 'crm_events', lastId);
    if (res) {
      const [_, entries] = res[0];
      for (const [id, fields] of entries) {
        lastId = id;
        const data = Object.fromEntries(fields.reduce((acc, val, i, arr) => {
          if (i % 2 === 0) acc.push([val, arr[i + 1]]);
          return acc;
        }, []));
        if (data.type === 'customer_ingest') {
          await Customer.insertMany(JSON.parse(data.payload));
        } else if (data.type === 'order_ingest') {
          await Order.insertMany(JSON.parse(data.payload));
        } else if (data.type === 'campaign_send') {
          // Send campaign messages in batch
          const { campaignId, message, customerIds } = JSON.parse(data.payload);
          for (const customerId of customerIds) {
            const customer = await Customer.findById(customerId);
            if (!customer) continue;
            // Simulate delivery
            const delivered = Math.random() < 0.9;
            await CommunicationLog.create({
              campaign: campaignId,
              customer: customerId,
              status: delivered ? 'SENT' : 'FAILED',
              message,
              deliveredAt: new Date()
            });
            await sendSMS(customer.phone, message);
          }
          await Campaign.findByIdAndUpdate(campaignId, { status: 'completed' });
        }
      }
    }
  }
}
module.exports = startConsumer;