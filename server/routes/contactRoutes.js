import express from 'express';
import {
	createContact,
	getAllContacts,
	getSingleContact,
	deleteContact,
} from '../controllers/contactController.js';
import { adminProtect, protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js'; // ✅ Import rate limiter

const router = express.Router();

// ✅ Apply limiter to prevent spam
router.post('/', authLimiter, createContact);

// ✅ Protected routes - admin only
router.get('/', protect, adminProtect, getAllContacts);
router.get('/:id', protect, adminProtect, getSingleContact);
router.delete('/:id', protect, adminProtect, deleteContact);

export default router;
