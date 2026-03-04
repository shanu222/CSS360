import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './backend/config/prisma.js';

// Import routes
import authRoutes from './backend/routes/auth.js';
import progressRoutes from './backend/routes/progress.js';
import noteRoutes from './backend/routes/notes.js';
import communityRoutes from './backend/routes/community.js';
import currentAffairRoutes from './backend/routes/currentAffairs.js';
import mcqRoutes from './backend/routes/mcqs.js';
import aiRoutes from './backend/routes/ai.js';
import resourceRoutes from './backend/routes/resources.js';
import pastPaperRoutes from './backend/routes/pastPapers.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Test Prisma connection
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database Connected: Supabase PostgreSQL');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('⚠️  Server will start without database. Some features may not work.');
  }
}

testDatabaseConnection();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch (error) {
    dbStatus = 'disconnected';
  }
  
  res.json({ 
    status: 'Server is running!',
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStatus,
      type: 'PostgreSQL (Supabase)',
      hasDatabaseURL: !!process.env.DATABASE_URL,
      hasJWTSecret: !!process.env.JWT_SECRET,
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/current-affairs', currentAffairRoutes);
app.use('/api/mcqs', mcqRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/past-papers', pastPaperRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve CSS past papers
app.use('/css-papers', express.static(path.join(__dirname, 'CSS_Past_Papers')));

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes - serve React app (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({ 
    error: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Frontend: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});
