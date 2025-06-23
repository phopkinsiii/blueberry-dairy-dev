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
import { authLimiter } from '../middleware/rateLimiter.js'; // ✅ Add limiter

import multer from 'multer';
import path from 'path';
import { __dirname } from '../controllers/uploadController.js';

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
		cb(new Error('Only .jpg, .jpeg, .png files are allowed'));
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();

// ✅ Test route
router.get('/test', (req, res) => {
	res.send('✅ Products API working!');
});

// ✅ Public Routes
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);

// ✅ Admin-only Routes with Rate Limiting
router.post(
	'/',
	protect,
	adminProtect,
	authLimiter, // ✅ Throttle product creation
	upload.single('image'),
	createProduct
);

router.put('/:id', protect, adminProtect, authLimiter, updateProduct); // ✅ Throttle update
router.delete('/:id', protect, adminProtect, authLimiter, deleteProduct); // ✅ Throttle delete
router.patch(
	'/:id/stock',
	protect,
	adminProtect,
	authLimiter,
	updateProductStock
); // ✅ Throttle stock updates

export default router;
