// Dummy SMS sender for demo (replace with real provider for prod)
async function sendSMS(phone, message) {
  console.log(`Sending SMS to ${phone}: ${message}`);
  // Simulate delay
  await new Promise(res => setTimeout(res, 100));
  return true;
}
module.exports = sendSMS;