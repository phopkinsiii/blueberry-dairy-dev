// tests/utils/testAuth.js
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const generateTestToken = () => {
	const userId = new mongoose.Types.ObjectId().toHexString();
	const token = jwt.sign(
		{ id: userId, role: 'admin' }, // 👈 optional: simulate admin here if needed
		process.env.JWT_SECRET || 'test_jwt_secret',
		{ expiresIn: '1h' }
	);
	return token;
};
