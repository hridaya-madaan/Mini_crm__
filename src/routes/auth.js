const express = require('express');
const passport = require('passport');

const router = express.Router();

// Start Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback after Google login
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Send token/cookie or redirect to frontend (customize for JWT if needed)
  res.redirect(process.env.FRONTEND_URL + '/login-success');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});

router.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  res.json(req.user);
});

module.exports = router;