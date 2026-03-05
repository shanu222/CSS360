import express from 'express';
import * as aiController from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', aiController.chat);
router.post('/essay/outline', aiController.generateEssayOutline);
router.post('/essay/analyze', aiController.analyzeEssay);
router.post('/study/suggestions', aiController.getStudySuggestions);
router.post('/examiner/train', aiController.trainExaminerModel);
router.get('/examiner/profile', aiController.getExaminerProfile);
router.post('/examiner/evaluate', aiController.evaluateAnswerWithExaminerModel);
router.post('/examiner/refine', aiController.refineAnswerWithExaminerModel);
router.post('/examiner/predict-questions', aiController.predictFutureQuestions);

export default router;
