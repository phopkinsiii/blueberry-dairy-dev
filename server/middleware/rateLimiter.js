// server/middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// 🔐 Strict limiter for auth-related routes
export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // limit each IP to 5 requests
	message: 'Too many attempts from this IP. Please try again in 15 minutes.',
	standardHeaders: true,
	legacyHeaders: false,
});

// 🌐 General limiter for global API fallback
export const globalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // 100 requests per 15 minutes
	message: 'Too many requests. Please try again later.',
	standardHeaders: true,
	legacyHeaders: false,
});
