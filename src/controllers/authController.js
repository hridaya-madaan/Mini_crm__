const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateOTP = require('../utils/generateOTP');
const sendSMS = require('../utils/sendSMS');

exports.googleLogin = async (req, res) => {
  // req.user set by passport
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
};

exports.phoneLogin = async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
  // Store OTP in-memory for demo, use Redis for prod
  global.otpStore = global.otpStore || {};
  global.otpStore[phone] = otp;
  await sendSMS(phone, `Your OTP is ${otp}`);
  res.json({ message: 'OTP sent' });
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  if (global.otpStore && global.otpStore[phone] === otp) {
    let user = await User.findOne({ phone });
    if (!user) user = await User.create({ phone, name: phone });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    delete global.otpStore[phone];
    return res.json({ token });
  }
  res.status(400).json({ error: 'Invalid OTP' });
};

exports.currentUser = async (req, res) => {
  res.json(req.user);
};