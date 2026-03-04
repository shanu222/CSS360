import express from 'express';
import * as progressController from '../controllers/progressController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', progressController.getUserProgress);
router.get('/stats', progressController.getStatistics);
router.get('/:subjectId', progressController.getSubjectProgress);
router.put('/:subjectId', progressController.updateProgress);
router.post('/:subjectId/score', progressController.addPracticeScore);

export default router;
