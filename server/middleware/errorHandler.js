// server/middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
	console.error(`❌ Error: ${err?.message}`);

	const statusCode =
		res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

	res.status(statusCode).json({
		message: err?.message || 'Server Error',
		stack: process.env.NODE_ENV === 'development' ? err?.stack : null,
		name: err?.name || 'Error',
		code: err?.code || 'UNKNOWN_ERROR',
	});
};
