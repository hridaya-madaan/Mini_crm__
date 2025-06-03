# Mini CRM Platform

A professional, innovative CRM platform with customer segmentation, campaign delivery, analytics, and AI.

## Features

- Customer & Order Ingestion (async pub/sub)
- Audience Segmentation with flexible rules
- Campaign creation, delivery, and performance logging
- Google OAuth & Mobile OTP authentication
- AI-powered rule parsing and message suggestions (OpenAI)
- Batch delivery and status tracking
- Swagger API docs at `/api-docs`

## Tech Stack
-React.js , typescript ,  Tailwind Frame Works , Farmer Motion
- Node.js, Express, MongoDB, Redis Streams
- Passport.js (Google OAuth2), JWT, OpenAI API

## Setup

1. **Install dependencies**
   ```
   npm install
   ```
2. **Start MongoDB and Redis**
   ```
   mongod
   redis-server
   ```
3. **Run the app**
   ```
   npm run dev
   ```
4. **Open **
   Visit [https://cerulean-khapse-103606.netlify.app/dashboard](https://cerulean-khapse-103606.netlify.app/dashboard)

## Architecture

- REST API (Express)
- Async ingestion and campaign delivery via Redis Streams consumer
- AI endpoints for natural language processing
Touchpoint/
├── backend/
│   └── src/
│       ├── config/            # DB, Redis configuration
│       ├── controllers/       # Business logic for API endpoints
│       ├── middleware/        # Auth, validation, error handling
│       ├── models/            # MongoDB schemas (Customer, Order, User, Campaign, etc.)
│       ├── pubsub/            # Redis Streams publisher/consumer for async jobs
│       ├── routes/            # Express routers for all API endpoints
│       ├── utils/             # Helpers (OTP, AI integration, SMS)
│       ├── app.js             # Express app setup
│       └── server.js          # Server entrypoint
├── frontend/
│   └── src/
│       ├── components/        # UI elements (tables, forms, sidebar, etc.)
│       ├── lib/               # API client utilities
│       ├── pages/             # Next.js or React router pages
│       ├── styles/            # CSS/theme files
│       └── public/            # Static assets
├── .env                       # Backend environment variables
├── .env.local                 # Frontend environment variables
├── README.md
## AI Tools

- OpenAI GPT-4 for rule parsing, message suggestion, summaries

## Known Limitations

- OTP is in-memory (use Redis for prod)
- Vendor API is simulated
- No email sending (SMS only dummy)

## Public link = https://cerulean-khapse-103606.netlify.app/dashboard

## by hridaya madaan
