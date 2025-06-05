import express from 'express';
import {
	getAllGoats,
	getGoatById,
	createGoat,
	updateGoat,
	deleteGoat,
} from '../controllers/goatController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllGoats);
router.get('/:id', getGoatById);

// Admin-only routes
router.post('/', protect, adminProtect, createGoat);
router.put('/:id', protect, adminProtect, updateGoat);
router.delete('/:id', protect, adminProtect, deleteGoat);

export default router;
