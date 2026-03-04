import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';
import {
  getResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
  incrementViews,
  incrementDownloads,
  getStatistics,
  handleFileUpload,
} from '../controllers/resourceController.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be stored in uploads/ folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Allow specific file types
  const allowedTypes = /pdf|doc|docx|ppt|pptx|mp4|avi|mov|jpg|jpeg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed: PDF, DOC, PPT, MP4, images'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

// Public routes
router.get('/', getResources); // Get all resources (with filters)
router.get('/stats', authenticate, isAdmin, getStatistics); // Admin statistics
router.get('/:id', getResource); // Get single resource
router.post('/:id/view', incrementViews); // Increment view count
router.post('/:id/download', incrementDownloads); // Increment download count

// Admin routes
router.post('/', authenticate, isAdmin, createResource); // Create resource
router.put('/:id', authenticate, isAdmin, updateResource); // Update resource
router.delete('/:id', authenticate, isAdmin, deleteResource); // Delete resource

// File upload route
router.post('/upload', authenticate, isAdmin, upload.single('file'), handleFileUpload);

export default router;
