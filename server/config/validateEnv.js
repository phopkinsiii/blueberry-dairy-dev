// server/config/validateEnv.js
export const validateEnv = () => {
	const requiredVars = [
		'MONGO_URI',
		'CLIENT_URL',
		'NODE_ENV',
		'PORT',
		'STRIPE_SECRET_KEY',
		'RESEND_API_KEY',
		'CLOUDINARY_UPLOAD_PRESET',
		'CLOUDINARY_UPLOAD_URL',
	];

	const missing = requiredVars.filter((key) => !process.env[key]);

	if (missing.length) {
		console.error(
			`❌ Missing required environment variables: ${missing.join(', ')}`
		);
		process.exit(1);
	} else {
		console.log('✅ All required environment variables are present');
	}
};
