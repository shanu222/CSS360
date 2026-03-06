import express from 'express';
import { getPublishedContent } from '../controllers/contentController.js';

const router = express.Router();

router.get('/', getPublishedContent);

export default router;
