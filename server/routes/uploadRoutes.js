import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadImage, __dirname } from '../controllers/uploadController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js'; // ✅ Import limiter

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
	limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

const router = express.Router();

// ✅ Admin-only + rate limited upload route
router.post('/', protect, adminProtect, authLimiter, upload.single('image'), uploadImage);

export default router;
