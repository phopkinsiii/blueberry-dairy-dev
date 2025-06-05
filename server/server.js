import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Debug the loaded environment variable
console.log('✅ CLIENT_URL from .env:', process.env.CLIENT_URL);

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import forumRoutes from './routes/forumRoutes.js';
import goatRoutes from './routes/goatRoutes.js';

const app = express();

// ✅ Set allowed origins from .env or fallback
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173'];

// ✅ Resolve __dirname (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure /uploads directory exists
const uploadsDir = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}

// ✅ CORS middleware (with origin logging for debugging)
app.use(
	cors({
		origin: function (origin, callback) {
			console.log('🔍 Incoming origin:', origin);

			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				console.warn('❌ CORS Rejected origin:', origin);
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	})
);

// Middleware
app.use(morgan('dev'));
app.use('/webhook', express.raw({ type: 'application/json' }), webhookRoutes);
app.use(express.json());

// ✅ Serve static files (uploads)
app.use(
	'/uploads',
	(req, res, next) => {
		res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		);
		next();
	},
	express.static(uploadsDir)
);

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/goats', goatRoutes);

// ✅ Error handler
app.use(errorHandler);

// ✅ Connect to DB and start server
connectDB();

const port = process.env.PORT || 5050;

app.listen(port, () => {
	console.log(`✅ Server listening on port ${port}`);
});
