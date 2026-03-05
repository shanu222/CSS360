import express from 'express';
import multer from 'multer';
import path from 'path';
import * as noteController from '../controllers/noteController.js';

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'uploads/'),
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
	},
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const allowed = /jpg|jpeg|png|webp/;
		const extname = allowed.test(path.extname(file.originalname).toLowerCase());
		const mimetype = allowed.test(file.mimetype);
		if (extname && mimetype) return cb(null, true);
		return cb(new Error('Only image files are allowed.'));
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
