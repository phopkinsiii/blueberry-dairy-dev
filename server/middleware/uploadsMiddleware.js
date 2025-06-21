// server/middleware/uploadsMiddleware.js
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '../uploads');

// ✅ Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
	console.log(`📂 Created uploads directory at ${uploadsDir}`);
}

// ✅ Serve static files from /uploads with cache headers
export const uploadsMiddleware = express.static(uploadsDir, {
	maxAge: '1d', // cache uploads for 1 day
	setHeaders: (res) => {
		res.setHeader('Cache-Control', 'public, max-age=86400');
	},
});

// ✅ CORS headers for direct file access
export const uploadsCORSHeaders = (req, res, next) => {
	const allowedOrigin = process.env.CLIENT_URL || '';
	if (!allowedOrigin) {
		console.warn('⚠️ CLIENT_URL not set for uploadsCORSHeaders');
	}
	res.header('Access-Control-Allow-Origin', allowedOrigin);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
};
