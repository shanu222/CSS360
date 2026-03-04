# CSS360 ACADEMY - Full Stack Application

A comprehensive CSS (Central Superior Services) examination preparation platform with real-time features, cross-device synchronization, and AI-powered assistance.

## 🚀 Features

### ✅ Authentication & User Management
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Cross-device user session management
- Profile management

### 📚 Study Features
- **Subject Progress Tracking**: Track your progress across all CSS subjects
- **Notes System**: Create, edit, and share study notes
- **MCQ Practice**: Practice with subject-wise MCQ banks
- **Past Papers**: Access and practice CSS past papers
- **Study Planner**: Create and manage personalized study schedules

### 🤖 AI Assistant
- Chat with AI for CSS-related queries
- Generate essay outlines automatically
- Get essay analysis and feedback
- Receive personalized study suggestions
- Powered by OpenAI GPT-4

### 📰 Current Affairs
- Latest Pakistan and international affairs
- CSS-relevance tagged content
- Search and filter by category

### 👥 Community Forum
- Create discussion threads
- Reply to community questions
- Like and engage with posts
- Subject-wise discussions

### 🔄 Cross-Device Sync
- All user data synced across devices
- Progress, notes, and scores accessible anywhere
- Real-time updates via MongoDB

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Radix UI** components

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **OpenAI API** for AI features

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/shanu222/CSS360.git
   cd CSS360
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the values:
   ```bash
   # MongoDB (local or Atlas)
   MONGODB_URI=mongodb://localhost:27017/css360-academy

   # JWT Secret (use a strong random string)
   JWT_SECRET=your-super-secret-jwt-key-here

   # OpenAI API Key (optional, for AI features)
   OPENAI_API_KEY=your-openai-api-key

   # Server config
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   - If using local MongoDB:
     ```bash
     # On Windows
     mongod

     # On Mac/Linux
     sudo systemctl start mongod
     ```
   - Or use MongoDB Atlas (cloud) connection string

5. **Seed initial data (optional)**
   ```bash
   npm run seed
   ```

6. **Run the application**

   **Development Mode** (Frontend only):
   ```bash
   npm run dev
   # App runs on http://localhost:5173
   ```

   **Production Mode** (Full stack):
   ```bash
   # Build frontend
   npm run build

   # Start backend server (serves built frontend)
   npm start
   # App runs on http://localhost:5000
   ```

## 🔐 First Time Setup

1. Visit http://localhost:5173 (dev) or http://localhost:5000 (prod)
2. Click "Sign up" to create an account
3. Enter your name, email, and password
4. Start using the app!

## 📖 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Progress
- `GET /api/progress` - Get all subject progress
- `GET /api/progress/:subjectId` - Get specific subject progress
- `PUT /api/progress/:subjectId` - Update progress
- `POST /api/progress/:subjectId/score` - Add practice score
- `GET /api/progress/stats` - Get statistics

### Notes
- `GET /api/notes` - Get notes
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `POST /api/notes/:id/like` - Like note

### Community
- `GET /api/community` - Get threads
- `POST /api/community` - Create thread
- `POST /api/community/:id/reply` - Add reply
- `POST /api/community/:id/like` - Like thread

### MCQs
- `GET /api/mcqs` - Get MCQ questions
- `POST /api/mcqs/attempt` - Submit attempt
- `GET /api/mcqs/attempts` - Get user attempts
- `GET /api/mcqs/stats` - Get statistics

### AI Assistant
- `POST /api/ai/chat` - Chat with AI
- `POST /api/ai/essay/outline` - Generate essay outline
- `POST /api/ai/essay/analyze` - Analyze essay
- `POST /api/ai/study/suggestions` - Get study suggestions

### Current Affairs
- `GET /api/current-affairs` - Get current affairs
- `GET /api/current-affairs/:id` - Get single affair

## 🚀 Deployment

### Deploy to Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Create new **Web Service**
4. Connect your repository
5. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
6. Add environment variables from `.env`
7. Deploy!

### PDF Storage for Past Papers

The CSS_Past_Papers folder (188+ PDFs, ~500MB) is **NOT** included in the repository to avoid large build sizes and deployment timeouts.

**📋 See [PDF_DEPLOYMENT_GUIDE.md](PDF_DEPLOYMENT_GUIDE.md) for complete instructions on:**
- Setting up Render persistent disk
- Uploading PDFs to production
- Alternative cloud storage options (S3, Cloudinary)
- Running the FPSC scraper in production
- Troubleshooting deployment issues

**Quick Setup:**
1. Deploy app to Render (persistent disk auto-created)
2. Access Render Shell and create folder structure
3. Upload PDFs manually or via automation script
4. Verify at: `https://your-app.render.com/api/past-papers/index`

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

### OpenAI API Setup

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create API key
3. Add to `OPENAI_API_KEY` environment variable

## 📱 Features Overview

### Dashboard
- Overview of all subjects with progress
- Quick access to all features
- Study statistics

### Subjects
- Compulsory subjects (English, Pakistan Affairs, etc.)
- Optional subjects based on groups
- Progress tracking per subject
- Topic completion tracking

### AI Assistant
- Smart CSS-focused chatbot
- Essay writing assistance
- Study plan generation
- Subject-specific guidance

### Practice Tests
- MCQ practice by subject and topic
- Instant scoring and feedback
- Performance analytics
- Question explanations

### Notes
- Rich text notes
- Organize by subject and tags
- Share with community
- Search and filter

### Community
- Discussion threads
- Ask and answer questions
- Subject-wise forums
- Like and engage

### Study Planner
- Create custom study schedules
- Track daily tasks
- Monitor completion
- Adjust plans dynamically

## 🔧 Development

### Project Structure
```
CSS360/
├── backend/
│   ├── models/          # Mongoose models
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── config/          # Database config
│   └── scripts/         # Seed scripts
├── src/
│   ├── app/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── data/        # Mock data (legacy)
│   ├── services/        # API services
│   ├── contexts/        # React contexts
│   └── styles/          # CSS files
├── server.js            # Express server
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies
```

### Adding New Features

1. **Add Backend API**:
   - Create model in `backend/models/`
   - Create controller in `backend/controllers/`
   - Create routes in `backend/routes/`
   - Register routes in `server.js`

2. **Add Frontend Service**:
   - Create service file in `src/services/`
   - Add TypeScript interfaces
   - Implement API calls

3. **Update UI**:
   - Create/update components
   - Use service to fetch data
   - Handle loading and error states

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network access (for Atlas)

### AI Features Not Working
- Verify `OPENAI_API_KEY` is set
- Check OpenAI account has credits
- AI features gracefully degrade if unavailable

### Authentication Issues
- Clear browser localStorage
- Check `JWT_SECRET` is set
- Verify token expiry settings

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - feel free to use for your CSS preparation!

## 📞 Support

For issues or questions:
- Open GitHub issue
- Email: support@css360academy.com

## 🎓 About CSS

The Central Superior Services (CSS) examination is conducted by the Federal Public Service Commission (FPSC) of Pakistan for recruitment to various civil service posts.

---

Built with ❤️ for CSS aspirants 🇵🇰
