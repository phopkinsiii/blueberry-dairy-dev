import express from 'express';
import {
	getAllUsers,
	loginUser,
	registerUser,
	setAdminRole,
	requestPasswordReset,
	resetPassword,
	toggleAdminRole,
} from '../controllers/userController.js';
import { adminProtect, protect } from '../middleware/authMiddleware.js';
import { registerValidator } from '../middleware/validators/userValidators.js';
import { validationResultHandler } from '../middleware/validationResultHandler.js';
import { authLimiter } from '../middleware/rateLimiter.js'; // ✅ Import limiter

const router = express.Router();

// ✅ Apply limiter to sensitive POST routes
router.post(
	'/register',
	authLimiter,
	registerValidator,
	validationResultHandler,
	registerUser
);
router.post('/login', authLimiter, loginUser);
router.post('/request-password-reset', authLimiter, requestPasswordReset);
router.post('/reset-password', resetPassword);

router.put('/set-admin/:userId', protect, adminProtect, setAdminRole);
router.put('/remove-admin/:userId', protect, adminProtect, toggleAdminRole);
router.put('/toggle-role/:userId', protect, adminProtect, toggleAdminRole);

router.get('/', protect, adminProtect, getAllUsers);

export default router;
