import express from 'express';
import {
  createContentItem,
  deleteContentItem,
  deleteUser,
  forceLogoutUser,
  getActiveUsers,
  getContentItems,
  getUsers,
  updateContentItem,
} from '../controllers/adminController.js';
import { adminOnly, authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate, adminOnly);

router.get('/users', getUsers);
router.get('/active-users', getActiveUsers);
router.delete('/users/:id', deleteUser);
router.post('/users/:id/force-logout', forceLogoutUser);

router.get('/content', getContentItems);
router.post('/content', createContentItem);
router.put('/content/:id', updateContentItem);
router.delete('/content/:id', deleteContentItem);

export default router;
