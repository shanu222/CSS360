# CSS360 ACADEMY - Complete Setup Guide

This guide will help you set up all necessary services for your production app.

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- A GitHub account
- A browser

## 🚀 Quick Setup (5 minutes)

### Step 1: MongoDB Atlas Setup (Free Tier)

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google/GitHub or email (it's free!)

2. **Create a Free Cluster**
   - Choose "M0 Free" tier (no credit card needed)
   - Select a cloud provider (AWS recommended)
   - Choose a region close to you
   - Click "Create Cluster" (takes 2-3 minutes)

3. **Create Database User**
   - Click "Database Access" in left sidebar
   - Click "+ ADD NEW DATABASE USER"
   - Choose "Password" authentication
   - Username: `css360admin`
   - Password: Click "Autogenerate Secure Password" and COPY IT
   - User Privileges: Select "Atlas Admin"
   - Click "Add User"

4. **Allow Network Access**
   - Click "Network Access" in left sidebar
   - Click "+ ADD IP ADDRESS"
   - Click "ALLOW ACCESS FROM ANYWHERE" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" in left sidebar
   - Click "Connect" button on your cluster
   - Click "Connect your application"
   - Select "Node.js" and version "5.5 or later"
   - COPY the connection string (looks like: `mongodb+srv://css360admin:<password>@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with the password you copied earlier
   - Add database name at the end: `...mongodb.net/css360academy`

### Step 2: OpenAI API Key (Required for AI Features)

1. **Create OpenAI Account**
   - Go to: https://platform.openai.com/signup
   - Sign up with Google/email

2. **Add Payment Method** (required for API access)
   - Go to: https://platform.openai.com/account/billing
   - Add a payment method ($5 minimum deposit recommended)
   - Note: GPT-4 costs ~$0.03 per 1000 tokens (very cheap for testing)

3. **Create API Key**
   - Go to: https://platform.openai.com/api-keys
   - Click "+ Create new secret key"
   - Name it "CSS360 Academy"
   - COPY the key (starts with `sk-...`)
   - ⚠️ Save it immediately - you can't see it again!

### Step 3: Configure Your App

1. **Update .env file** (already exists in your project)
   
   Open `f:\CSS360\.env` and update:

   ```env
   # MongoDB Connection - PASTE YOUR CONNECTION STRING HERE
   MONGODB_URI=mongodb+srv://css360admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/css360academy?retryWrites=true&w=majority

   # JWT Secret - Keep this secret and random
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # OpenAI API Key - PASTE YOUR API KEY HERE
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

2. **Generate a Strong JWT Secret** (optional but recommended)
   
   Run in PowerShell:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   
   Copy the output and replace `JWT_SECRET` value in `.env`

### Step 4: Initialize the Database

Run the seed script to populate initial data:

```powershell
npm run seed
```

You should see:
```
✅ Connected to MongoDB
✅ Cleared existing data
✅ Created sample current affairs (2 posts)
✅ Database seeded successfully!
```

### Step 5: Start the Application

**Development Mode** (with hot reload):
```powershell
npm run dev
```

**Production Mode**:
```powershell
npm start
```

The app will run on:
- Frontend: http://localhost:5173 (dev) or http://localhost:5000 (production)
- Backend API: http://localhost:5000

### Step 6: Test Your App

1. **Open the app**: Go to http://localhost:5173
2. **Register an account**: Click "Create Account" and fill in details
3. **Login**: Use your credentials
4. **Test features**:
   - ✅ Study Planner - Create and save study plans
   - ✅ Progress Tracking - Mark topics as complete
   - ✅ Notes - Create and save notes
   - ✅ MCQ Practice - Take practice tests
   - ✅ AI Assistant - Ask questions (requires OpenAI key)
   - ✅ Community - Post threads and comments
   - ✅ Current Affairs - View daily updates

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error: "MongoNetworkError"**
- Check your internet connection
- Verify IP is whitelisted in Atlas (Network Access)
- Confirm password is correct in connection string

**Error: "Authentication failed"**
- Check username/password in connection string
- Ensure user has "Atlas Admin" role
- Try URL encoding special characters in password

### OpenAI API Issues

**Error: "Invalid API key"**
- Verify key starts with `sk-`
- Check for extra spaces in `.env` file
- Ensure you have credits in your OpenAI account

**Error: "Insufficient quota"**
- Add credits to your OpenAI account
- Go to: https://platform.openai.com/account/billing

### Port Already in Use

**Error: "Port 5000 is already in use"**
```powershell
# Find and kill the process using port 5000
Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

## 🌐 Deploy to Production (Render.com)

### Prerequisites
- GitHub account with your code pushed
- Render.com account (free tier available)

### Deployment Steps

1. **Prepare for Production**
   - Ensure all code is committed and pushed to GitHub
   - Verify `render.yaml` exists in root directory ✅
   - Check `.nvmrc` specifies Node version ✅

2. **Deploy to Render**
   - Go to: https://render.com
   - Sign up/Login with GitHub
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository: `shanu222/CSS360`
   - Render will detect `render.yaml` automatically
   - Click "Apply"

3. **Set Environment Variables in Render**
   - Go to your service dashboard
   - Click "Environment" tab
   - Add these variables:
     ```
     MONGODB_URI = <your-atlas-connection-string>
     JWT_SECRET = <your-jwt-secret>
     OPENAI_API_KEY = <your-openai-key>
     NODE_ENV = production
     ```
   - Click "Save Changes"

4. **Update MongoDB Atlas for Production**
   - Go to MongoDB Atlas → Network Access
   - Add Render's IP (or keep "Allow from anywhere" for simplicity)

5. **Access Your Live App**
   - Render will provide a URL like: `https://css360-academy.onrender.com`
   - Share this URL with users!

## 📱 Features Enabled

### ✅ Authentication & Authorization
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes and API endpoints

### ✅ Cross-Device Synchronization
- All user data synced via MongoDB
- Progress tracked per subject
- Access from any device
- Real-time updates

### ✅ Progress Tracking
- Track completion per subject
- Practice test scores
- Study time tracking
- Performance analytics

### ✅ AI Features (OpenAI GPT-4)
- Chat assistant for queries
- Essay outline generation
- Essay analysis and feedback
- Personalized study suggestions

### ✅ File Upload System
- User profile pictures
- Document uploads
- Secure file storage
- File type validation

### ✅ Community Features
- Discussion threads
- Comments and replies
- User reputation system
- Moderation tools

### ✅ Current Affairs
- Daily updates
- Category-based organization
- Source attribution
- Admin-only posting

### ✅ MCQ Practice
- Subject-wise tests
- Timed attempts
- Score calculation
- Performance history

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token authentication
- ✅ HTTP-only cookies (optional)
- ✅ CORS protection
- ✅ MongoDB injection prevention
- ✅ Input validation
- ✅ Rate limiting ready
- ✅ XSS protection

## 💡 Tips

1. **Free Tier Limits**
   - MongoDB Atlas M0: 512 MB storage (perfect for starting)
   - Render.com free tier: App sleeps after 15 min inactivity
   - OpenAI: Pay per use (~$5 for extensive testing)

2. **Cost Optimization**
   - Use GPT-3.5 instead of GPT-4 for lower costs (edit `aiController.js`)
   - Implement response caching for AI features
   - Set up rate limiting to prevent abuse

3. **Monitoring**
   - Check MongoDB Atlas metrics for usage
   - Monitor OpenAI usage in their dashboard
   - Use Render.com logs for debugging

4. **Backup**
   - MongoDB Atlas has automated backups
   - Download your data periodically
   - Keep your `.env` file secure and backed up separately

## 📞 Need Help?

- MongoDB Docs: https://docs.mongodb.com/
- OpenAI Docs: https://platform.openai.com/docs
- Render Docs: https://render.com/docs
- Express.js Docs: https://expressjs.com/

---

**Ready to launch! 🚀** Your CSS360 Academy app is now a fully functional production application with real database, authentication, AI features, and cross-device sync!
