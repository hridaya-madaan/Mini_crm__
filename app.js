require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const redisClient = require('./redis');
// No need to require/createClient or connect again here!

const app = express();

// Connect to MongoDB
connectDB();

// CORS config
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// JSON parsing
app.use(express.json());

// Session and Passport config for Google OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'crm-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails && profile.emails[0].value,
        avatar: profile.photos && profile.photos[0].value,
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Swagger Docs (swagger.json in project root or /swagger)
try {
  const swaggerDocument = require('../swagger/swagger.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  // No swagger docs found, skip
}

// Mount API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/customers', require('./routes/customer'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/campaigns', require('./routes/campaign'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/delivery', require('./routes/delivery'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));   

// Add your routes here, for example:
app.get('/api/dashboard-stats', (req, res) => {
  res.json({ customers: 0, invoices: 0, revenue: 0 });
});

// ...add other routes and middleware as needed...

app.listen(5001, () => {
  console.log('Server running on port 5001');
});
// Error handling (should be last)
app.use(errorHandler);

module.exports = app;
