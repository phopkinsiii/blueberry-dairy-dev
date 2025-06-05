// @ts-nocheck
import express from 'express';
import {
	getAllProducts,
	getSingleProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	updateProductStock,
} from '../controllers/productController.js';

import { protect, adminProtect } from '../middleware/authMiddleware.js';

// ✅ Multer for image upload
import multer from 'multer';
import path from 'path';
import { __dirname } from '../controllers/uploadController.js';

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

// ✅ File filter for images
const fileFilter = (req, file, cb) => {
	const allowedTypes = /jpeg|jpg|png/;
	const ext = path.extname(file.originalname).toLowerCase();
	if (allowedTypes.test(ext)) {
		cb(null, true);
	} else {
		cb(new Error('Only .jpg, .jpeg, .png files are allowed'));
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
});

const router = express.Router();

// ✅ Public Routes
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);

// ✅ Admin-only Routes
router.post('/', protect, adminProtect, upload.single('image'), createProduct);
router.put('/:id', protect, adminProtect, updateProduct);
router.delete('/:id', protect, adminProtect, deleteProduct);
router.patch('/:id/stock', protect, adminProtect, updateProductStock);

export default router;
