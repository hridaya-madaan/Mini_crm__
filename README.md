# Mini_crm__
Welcome to BloomCRM-by HRIDAYA! This CRM dashboard is themed around flowers and growth, using a vibrant, modern UI powered by React, TailwindCSS, and Framer Motion for smooth animations and effects.
# Bloom – Mini CRM Platform

## 🚀 Features

- **Customer & Order Data Ingestion:** Secure REST APIs for batch and individual uploads. Supports asynchronous processing via pub/sub (Redis Streams).
- **Audience Segmentation:** Flexible rule builder (AND/OR logic), natural language to segment rules (AI), and real-time audience preview.
- **Campaign Creation & Delivery:** Visual campaign builder, multi-variant messaging, batch delivery, and live delivery tracking (simulated vendor with ~90% success rate).
- **Campaign History & Analytics:** Detailed campaign stats, performance summaries, and human-readable insights powered by AI.
- **Authentication:** Google OAuth 2.0 and mobile OTP login for secure, user-friendly access.
- **AI Integration:** 
  - Natural language → segment rules
  - AI-generated campaign messages
  - Campaign performance summarization
- **Batch Processing:** Pub/sub architecture for ingestion and campaign delivery (scalable to millions of records/messages).
- **API Documentation:** Swagger UI at `/api-docs` for easy backend exploration and testing.
- **Professional, Intuitive UI:** Inspired by Salesforce, but innovative and highly interactive.
- **Secure and Extensible:** Modular codebase, JWT-based route protection, and clear separation of frontend/backend.
- **Production Ready:** Easily deployable to platforms like Render, Vercel, Railway, etc.

---

## 🏗️ Architecture

```
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
```

---

## 💡 AI Tools Used

- **OpenAI GPT-4 API** for:
  - Converting natural language to audience segment rules.
  - Suggesting campaign messages based on objectives.
  - Summarizing campaign delivery performance in plain English.
- **AI Integration:** Modular and can be swapped for any LLM API (Google Vertex AI, Replicate, etc.).

---

## 🛡️ Security

- **Auth:** Google OAuth 2.0 (Passport.js), JWT tokens for session management, and mobile OTP for fallback login.
- **API Protection:** All sensitive endpoints require authentication.
- **Validation:** Joi-based request validation.
- **CORS:** Configured for frontend-backend communication.

---

## 🚦 Getting Started

### Prerequisites

- Node.js >= 18.x
- MongoDB (local or Atlas)
- Redis (local or cloud)
- (Optionally) OpenAI API key, Google OAuth credentials

### Backend

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env` and fill in your secrets.
3. **Start MongoDB and Redis** (if local):
   ```bash
   mongod
   redis-server
   ```
4. **Run the backend:**
   ```bash
   npm run dev
   ```
5. **API docs:**  
   Visit [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

### Frontend

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Create `.env.local` with:**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
3. **Run the frontend:**
   ```bash
   npm run dev
   ```
4. **App:**  
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🧩 Extending & Customization

- **Add new campaign channels** (Email, WhatsApp, Push) by extending the pubsub/consumer and delivery logic.
- **Integrate additional AI tools** by adding new endpoints in `backend/src/controllers/aiController.js`.
- **Customize the UI** using your favorite component library (Material UI, Chakra UI, etc.).
- **Deploy** easily on Render, Railway, or Vercel (frontend).

---

## 📊 Known Limitations

- OTPs are stored in-memory for demo (use Redis in production).
- SMS is simulated (replace with Twilio or similar for real delivery).
- Vendor API is stubbed (for delivery simulation).
- Rule builder in frontend can be further enhanced for complex logic.

---

## 📹 Demo Video

_A 7-minute video walkthrough is required for submission. In your own voice, cover:_
- Features
- Technical approach and architecture
- AI integrations and how they're used
- Any trade-offs or known limitations

---

## 📝 License

MIT (or as specified in repo)

---

## 🤝 Contributing

Pull requests welcome! Please open an issue first to discuss your ideas.

---

## 👨‍💻 Author

- [hridaya-madaan](https://github.com/your-hridaya-madaan)  

  

