const redis = require('../config/redis');
async function publishEvent(stream, data) {
  await redis.xadd(stream, '*', ...Object.entries(data).flat());
}
module.exports = publishEvent;