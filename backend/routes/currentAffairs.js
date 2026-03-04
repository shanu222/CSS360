import express from 'express';
import * as currentAffairController from '../controllers/currentAffairController.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', currentAffairController.getCurrentAffairs);
router.get('/:id', currentAffairController.getCurrentAffair);

// Admin routes
router.post('/', authenticate, adminOnly, currentAffairController.createCurrentAffair);
router.put('/:id', authenticate, adminOnly, currentAffairController.updateCurrentAffair);
router.delete('/:id', authenticate, adminOnly, currentAffairController.deleteCurrentAffair);

export default router;
