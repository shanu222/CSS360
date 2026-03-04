import express from 'express';
import * as communityController from '../controllers/communityController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', communityController.getThreads);
router.get('/:id', communityController.getThread);
router.post('/', communityController.createThread);
router.post('/:id/reply', communityController.addReply);
router.post('/:id/like', communityController.likeThread);
router.delete('/:id', communityController.deleteThread);

export default router;
