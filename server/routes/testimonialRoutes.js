// server/routes/testimonialRoutes.js
import express from 'express';
import {
	createTestimonial,
	getTestimonials,
	updateTestimonial,
	deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.route('/').get(getTestimonials).post(createTestimonial);

// Admin-Only Routes
router
	.route('/:id')
	.put(protect, adminProtect, updateTestimonial)
	.delete(protect, adminProtect, deleteTestimonial);

export default router;
