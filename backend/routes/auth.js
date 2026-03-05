import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Legacy routes (kept for compatibility but no longer required)
// router.get('/me', authenticate, authController.getCurrentUser);
// router.put('/profile', authenticate, authController.updateProfile);

export default router;
