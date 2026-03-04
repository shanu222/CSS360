import express from 'express';
import { getPastPapersIndex, getYearPapers } from '../controllers/pastPaperController.js';

const router = express.Router();

// Get complete past papers index (all years)
router.get('/index', getPastPapersIndex);

// Get papers for a specific year
router.get('/year/:year', getYearPapers);

export default router;
