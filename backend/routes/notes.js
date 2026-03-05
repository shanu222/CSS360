import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as noteController from '../controllers/noteController.js';

const router = express.Router();

// Ensure uploads directory exists
const UPLOADS_DIR = 'uploads';
if (!fs.existsSync(UPLOADS_DIR)) {
	fs.mkdirSync(UPLOADS_DIR, { recursive: true });
	console.log('Created uploads directory');
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, UPLOADS_DIR),
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
	},
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		// Allow images: jpg, jpeg, png, gif, bmp, webp, svg
		// Allow documents: pdf, doc, docx, txt
		const allowed = /jpg|jpeg|png|gif|bmp|webp|svg|pdf|doc|docx|txt/;
		const extname = allowed.test(path.extname(file.originalname).toLowerCase());
		const mimetype = /image\/.*|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document|text\/plain/.test(file.mimetype);
		if (extname && mimetype) return cb(null, true);
		return cb(new Error('Unsupported file type. Allowed: images (JPG, PNG, GIF, etc.), PDF, Word, TXT'));
	},
	limits: { fileSize: 10 * 1024 * 1024 },
});

// Public routes (auth removed)

router.get('/subjects', noteController.getAvailableSubjects);
router.post('/my/upload', upload.single('image'), noteController.uploadImageNote);
router.post('/my/organize', noteController.organizeMyNotes);

router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNote);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.post('/:id/like', noteController.likeNote);

export default router;
