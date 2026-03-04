import express from 'express';
import * as mcqController from '../controllers/mcqController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', mcqController.getMCQs);
router.post('/attempt', mcqController.submitMCQAttempt);
router.get('/attempts', mcqController.getMCQAttempts);
router.get('/attempts/:id', mcqController.getMCQAttempt);
router.get('/stats', mcqController.getMCQStats);

export default router;
