// @ts-nocheck
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
	try {
		let token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Not authorized, no token' });
		}
		//Verify jwt token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id).select('-password');

		if (!req.user) {
			return res.status(401).json({ message: 'User not found' });
		}
		next();
	} catch (error) {
		res.status(401).json({ message: 'Not authorized, invalid token' });
	}
};

//Middleware to protect admin only routes
export const adminProtect = (req, res, next) => {
	if (req.user && req.user.role === 'admin') {
		next();
	} else {
		res.status(403).json({ message: 'Access denied: Admins only' });
	}
};
