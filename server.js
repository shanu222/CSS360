import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
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

// Middleware
app.use(cors({
  origin: '*', // Allow all origins
  credentials: false,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    environment: process.env.NODE_ENV || 'development',
  });
});

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
