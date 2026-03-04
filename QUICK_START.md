# 🚀 Quick Start - CSS360 Academy

**Get your app running in 5 minutes!**

## Step 1: MongoDB Atlas (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free, no credit card)
3. Create a free M0 cluster
4. Create database user:
   - Username: `css360admin`
   - Click "Autogenerate Secure Password" → **COPY IT**
5. Network Access → "Allow Access from Anywhere"
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy string (looks like: `mongodb+srv://css360admin:...`)
   - Replace `<password>` with your copied password
   - Add `/css360academy` at the end

## Step 2: OpenAI (2 minutes)

1. Go to https://platform.openai.com/signup
2. Add $5 credit at https://platform.openai.com/account/billing
3. Create API key at https://platform.openai.com/api-keys
4. **COPY the key** (starts with `sk-...`)

## Step 3: Configure (1 minute)

Open `f:\CSS360\.env` and update:

```env
MONGODB_URI=mongodb+srv://css360admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/css360academy?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Step 4: Run (30 seconds)

```powershell
# Seed the database with initial data
npm run seed

# Start development server
npm run dev
```

## Step 5: Test

1. Open http://localhost:5173
2. Click "Create Account" and register
3. Test all features! 🎉

---

**Need more details?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md)

**Ready to deploy?** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
