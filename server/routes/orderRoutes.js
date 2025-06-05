import express from 'express';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

import { createOrder, getOrderBySessionId, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

// Allow both guests and authenticated users to place an order
router.post('/', createOrder);
router.get('/session/:sessionId', getOrderBySessionId);
// ✅ NEW admin routes:
router.get('/', protect, adminProtect, getAllOrders);
router.patch('/:id', protect, adminProtect, updateOrderStatus);

export default router;
