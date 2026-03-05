import express from 'express';
import * as noteController from '../controllers/noteController.js';

const router = express.Router();

// Public routes (auth removed)

router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNote);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.post('/:id/like', noteController.likeNote);

export default router;
