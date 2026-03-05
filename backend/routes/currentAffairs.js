import express from 'express';
import * as currentAffairController from '../controllers/currentAffairController.js';
// Authentication removed - all routes are now public

const router = express.Router();

// Public routes
router.get('/', currentAffairController.getCurrentAffairs);
router.get('/:id', currentAffairController.getCurrentAffair);

// Public routes (previously admin)
router.post('/', currentAffairController.createCurrentAffair);
router.put('/:id', currentAffairController.updateCurrentAffair);
router.delete('/:id', currentAffairController.deleteCurrentAffair);

export default router;
