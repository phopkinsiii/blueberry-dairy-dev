// server/middleware/validateRequest.js
export const validateRequest = (schema) => (req, res, next) => {
	try {
		req.body = schema.parse(req.body); // will throw if invalid
		next();
	} catch (err) {
		return res.status(400).json({ message: err.errors?.[0]?.message || 'Validation failed' });
	}
};
