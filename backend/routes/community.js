import express from 'express';
import * as communityController from '../controllers/communityController.js';

const router = express.Router();

// Public routes (auth removed)

router.get('/', communityController.getThreads);
router.get('/:id', communityController.getThread);
router.post('/', communityController.createThread);
router.post('/:id/reply', communityController.addReply);
router.post('/:id/like', communityController.likeThread);
router.delete('/:id', communityController.deleteThread);

export default router;
