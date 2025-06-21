import express from 'express';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
import {
	createOrder,
	getOrderBySessionId,
	getAllOrders,
	updateOrderStatus,
} from '../controllers/orderController.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// ✅ Rate-limited public routes (guest or user)
// Public routes (no rate limiting for now)
router.post('/', createOrder);
router.get('/session/:sessionId', getOrderBySessionId);

// ✅ Admin-only routes
router.get('/', protect, adminProtect, getAllOrders);
router.patch('/:id', protect, adminProtect, updateOrderStatus);

export default router;
