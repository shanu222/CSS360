# MongoDB Setup - Quick Fix for Authentication Error

## 🔍 Problem
MongoDB is not running, causing "Authentication failed" error when registering/logging in.

## ✅ Solution 1: MongoDB Atlas (Cloud) - **RECOMMENDED** (5 minutes)

This is the fastest solution and works without installing anything locally.

### Steps:

1. **Create Free MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up with your email or Google account
   - Choose the **FREE** tier

2. **Create a Cluster**
   - Choose **AWS** as provider
   - Select nearest region (e.g., Mumbai, Singapore)
   - Click "Create Deployment" (takes ~3-5 minutes)

3. **Set Up Database Access**
   - Go to "Database Access" (left menu)
   - Click "Add New Database User"
   - Username: `css360admin`
   - Password: **Generate strong password** (copy it!)
   - Database User Privileges: **Read and write to any database**
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" (left menu)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" tab → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like):
   ```
   mongodb+srv://css360admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Update Your .env File**
   - Open `F:\CSS360\.env`
   - Replace the MongoDB URI line with:
   ```
   MONGODB_URI=mongodb+srv://css360admin:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/css360-academy?retryWrites=true&w=majority
   ```
   - Replace `YOUR_PASSWORD_HERE` with your actual password
   - Replace `cluster0.xxxxx` with your actual cluster URL

7. **Restart Your Server**
   ```powershell
   # Stop the current server (Ctrl+C in terminal)
   # Then restart:
   npm start
   ```

### ✅ Success Indicators:
You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
```

---

## 🪟 Solution 2: Install MongoDB Locally (Windows)

If you prefer local installation:

### Quick Install:

1. **Download MongoDB**
   - Go to https://www.mongodb.com/try/download/community
   - Download Windows version (MSI installer)

2. **Install MongoDB**
   - Run the installer
   - Choose "Complete" installation
   - Install MongoDB as a Windows Service: **YES** ✓
   - Install MongoDB Compass (GUI): **YES** ✓

3. **Verify Installation**
   ```powershell
   # Check if MongoDB service is running
   Get-Service -Name MongoDB
   
   # Should show Status: Running
   ```

4. **Test Connection**
   ```powershell
   mongosh
   # Should connect to mongodb://127.0.0.1:27017
   ```

5. **Your .env is Already Configured**
   ```
   MONGODB_URI=mongodb://localhost:27017/css360-academy
   ```

6. **Restart Your Server**
   ```powershell
   npm start
   ```

---

## 🧪 Test Database Connection

After setting up MongoDB, test the connection:

```powershell
# In your project directory
node -e "import('mongoose').then(m => m.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/css360-academy').then(() => { console.log('✅ MongoDB connection successful!'); process.exit(0); }).catch(err => { console.error('❌ Connection failed:', err.message); process.exit(1); }))"
```

---

## 🐛 Troubleshooting

### Error: "Authentication failed" still appears
**Solution:** Make sure you restarted the server after updating .env

### Error: "MongoServerError: bad auth"
**Solution:** Double-check username and password in connection string

### Error: "ECONNREFUSED"
**Solution (Local MongoDB):** 
```powershell
# Start MongoDB service
net start MongoDB

# Or check if it's installed
Get-Service MongoDB
```

### Error: "Could not connect to any servers"
**Solution (Atlas):** Check Network Access allows your IP (0.0.0.0/0)

---

## 🎯 Recommended Approach

**For Development:** Use **MongoDB Atlas** (Solution 1)
- ✅ No local installation needed
- ✅ Accessible from anywhere
- ✅ Free tier is sufficient for development
- ✅ Automatic backups
- ✅ Same as production setup

**For Production:** Your app is already configured for Atlas via environment variables on Render.

---

## 🚀 After MongoDB is Connected

Once you see "✅ MongoDB Connected", you can:

1. **Register a new account** - The form should work now
2. **Login successfully** 
3. **Use all features** (notes, progress tracking, MCQs, etc.)

---

## 📝 Current Status

- ✅ .env file exists and configured
- ❌ MongoDB not running (causing authentication error)
- ⏳ **Action Required:** Set up MongoDB using Solution 1 or 2

---

**Need Help?**
- MongoDB Atlas Docs: https://www.mongodb.com/docs/atlas/
- MongoDB Local Docs: https://www.mongodb.com/docs/manual/installation/
