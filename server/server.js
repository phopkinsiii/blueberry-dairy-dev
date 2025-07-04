// @ts-nocheck
// Force environment explicitly for dotenv-flow BEFORE loading config
//process.env.NODE_ENV = 'development';

import dotenv from 'dotenv-flow';
dotenv.config({ node_env: process.env.NODE_ENV }); // 👈 force load
// console.log('🧪 NODE_ENV:', process.env.NODE_ENV);
// console.log('🔐 STRIPE_SECRET_KEY starts with:', process.env.STRIPE_SECRET_KEY?.slice(0, 10));
// console.log('📬 STRIPE_WEBHOOK_SECRET starts with:', process.env.STRIPE_WEBHOOK_SECRET?.slice(0, 10));

// Debug check
// console.log('🔑 STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);

import { validateEnv } from './config/validateEnv.js';
validateEnv(); // ✅ Ensure all env variables are defined

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import { corsOptions } from './config/corsOptions.js';
import { globalLimiter } from './middleware/rateLimiter.js'; // Global limiter

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import goatRoutes from './routes/goatRoutes.js';
import milkRoutes from './routes/milkRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';

import {
	uploadsMiddleware,
	uploadsCORSHeaders,
} from './middleware/uploadsMiddleware.js';

import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// ✅ Compression first for better performance
app.use(compression());

// ✅ Security headers
app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
	})
);

app.use(
	helmet.contentSecurityPolicy({
		useDefaults: true,
		directives: {
			'default-src': ["'self'"],
			'img-src': ["'self'", 'data:', 'blob:', '*.cloudinary.com'],
			'script-src': ["'self'", 'https://js.stripe.com'],
			'style-src': [
				"'self'",
				"'unsafe-inline'",
				'https://fonts.googleapis.com',
			],
			'font-src': ["'self'", 'https://fonts.gstatic.com'],
			'frame-src': ["'self'", 'https://js.stripe.com'],
		},
	})
);

// ✅ Logger (only in development)
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

// ✅ CORS
app.use(cors(corsOptions));

// ✅ Stripe webhook needs raw body parsing BEFORE express.json()
app.use(
	'/api/webhook',
	express.raw({ type: 'application/json' }),
	webhookRoutes
);

// ✅ Global JSON parser
app.use(express.json());

// ✅ Apply global rate limiter to all /api routes
app.use('/api', globalLimiter);

// ✅ Static file serving for image uploads
app.use('/uploads', uploadsCORSHeaders, uploadsMiddleware);

// ✅ Route mounts (specific rate limits like authLimiter are inside route files)
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/goats', goatRoutes);
app.use('/api/testimonials', testimonialRoutes);

app.use('/api/milk', milkRoutes);

// ✅ Fallback for unknown API routes
app.use((req, res) => {
	res.status(404).json({ message: 'Not Found' });
});

// ✅ Global error handler
app.use(errorHandler);

// ✅ Start server
connectDB();

const port = process.env.PORT || 5050;
app.listen(port, () => {
	console.log(`✅ Server listening on port ${port}`);
});
