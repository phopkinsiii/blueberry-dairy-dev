// server/config/corsOptions.js
import dotenv from 'dotenv';
dotenv.config();

const envOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

export const corsOptions = {
	origin: (origin, callback) => {
		// Allow no-origin requests like Postman
		if (!origin) return callback(null, true);

		const isAllowed = envOrigins.includes(origin);
		const isHTTPS =
			origin.startsWith('https://') || origin.startsWith('http://localhost');

		if (isAllowed && isHTTPS) {
			callback(null, true);
		} else {
			callback(
				new Error('Not allowed by CORS (origin not trusted or not HTTPS)')
			);
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
