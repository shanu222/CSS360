import express from 'express';
import * as progressController from '../controllers/progressController.js';

const router = express.Router();

// Public routes (auth removed)

router.get('/', progressController.getUserProgress);
router.get('/stats', progressController.getStatistics);
router.get('/:subjectId', progressController.getSubjectProgress);
router.put('/:subjectId', progressController.updateProgress);
router.post('/:subjectId/score', progressController.addPracticeScore);

export default router;
