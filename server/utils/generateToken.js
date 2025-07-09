// @ts-nocheck
// server/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || '30d',
	});
};

export default generateToken;
