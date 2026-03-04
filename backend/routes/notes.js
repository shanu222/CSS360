import express from 'express';
import * as noteController from '../controllers/noteController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNote);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.post('/:id/like', noteController.likeNote);

export default router;
