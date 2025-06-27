//server/routes/goatRoutes.js

import express from 'express';
import {
	getAllGoats,
	getGoatById,
	createGoat,
	updateGoat,
	deleteGoat,
	getSaleGoats,
	getDoes,
	getBucks,
	removeGoatImage,
} from '../controllers/goatController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js'; // ✅ Import limiter

const router = express.Router();

// Public routes
// @route   GET /api/goats/for-sale
router.get('/for-sale', getSaleGoats);
router.get('/does', getDoes); // ✅ Add above dynamic routes like get by id.
router.get('/bucks', getBucks);

router.get('/', getAllGoats);
router.get('/:id', getGoatById);
// @route   GET /api/goats/for-sale
router.get('/for-sale', getSaleGoats);

// Admin-only routes with rate limiter
router.post('/', protect, adminProtect, authLimiter, createGoat);
router.put('/:id', protect, adminProtect, authLimiter, updateGoat);
router.delete('/:id', protect, adminProtect, authLimiter, deleteGoat);

router.post('/:id/images/remove', protect, adminProtect, removeGoatImage);

export default router;
