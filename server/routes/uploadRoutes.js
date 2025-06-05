import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadImage } from '../controllers/uploadController.js';
import { __dirname } from '../controllers/uploadController.js';

// Set up Multer storage
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const fileFilter = (req, file, cb) => {
	const allowedTypes = /jpeg|jpg|png/;
	const ext = path.extname(file.originalname).toLowerCase();
	if (allowedTypes.test(ext)) {
		cb(null, true);
	} else {
		cb(new Error('Only images are allowed (.jpg, .jpeg, .png)'));
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 }, // 5MB
});

const router = express.Router();

router.post('/', upload.single('image'), uploadImage);

export default router;
