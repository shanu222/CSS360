import express from 'express';
import * as mcqController from '../controllers/mcqController.js';

const router = express.Router();

// Public routes (auth removed)

router.get('/', mcqController.getMCQs);
router.post('/attempt', mcqController.submitMCQAttempt);
router.get('/attempts', mcqController.getMCQAttempts);
router.get('/attempts/:id', mcqController.getMCQAttempt);
router.get('/stats', mcqController.getMCQStats);

export default router;
