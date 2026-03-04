import express from 'express';
import * as aiController from '../controllers/aiController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/chat', aiController.chat);
router.post('/essay/outline', aiController.generateEssayOutline);
router.post('/essay/analyze', aiController.analyzeEssay);
router.post('/study/suggestions', aiController.getStudySuggestions);

export default router;
