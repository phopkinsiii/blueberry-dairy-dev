// get-mongo-uri.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server/.env
dotenv.config({ path: path.join(__dirname, 'server', '.env') });

// Extract and clean URI
const uri = process.env.MONGO_URI;
if (!uri) {
	console.error('❌ MONGO_URI is not defined in .env');
	process.exit(1);
}

// Strip query parameters for mongodump compatibility
const cleanUri = uri.split('?')[0];

// Output cleaned URI only
console.log(cleanUri);
