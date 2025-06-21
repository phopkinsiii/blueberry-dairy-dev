// @ts-nocheck
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';
import { sendOrderConfirmationEmail} from '../utils/email/sendOrderEmail.js';
import { sendPasswordResetEmail } from '../utils/email/sendPasswordResetEmail.js';
import generateToken from '../utils/generateToken.js';
import createUserResponse from '../utils/createUserResponse.js';
import {
	validateRegisterData,
	validateLoginData,
	validateResetPassword,
	validateEmail,
} from '../utils/validators.js';

// ✅ Register User
export const registerUser = async (req, res, next) => {
	try {
		console.log('🔍 Register payload:', req.body);
		const error = validateRegisterData(req.body);
		if (error) {
			console.log('❌ Validation error:', error); // <--- ADD THIS
			return res.status(400).json({ message: error });
		}

		const { firstName, lastName, email, password } = req.body;

		const userExists = await User.findOne({ email });
		if (userExists) {
			console.log('⚠️ Email already in use:', email);
			return res.status(400).json({ message: 'That email is already in use' });
		}

		const user = await User.create({ firstName, lastName, email, password });

		if (user) {
			user.token = generateToken(user._id, user.role);
			res.status(201).json(createUserResponse(user));
		} else {
			res.status(400).json({ message: 'Invalid user data' });
		}
	} catch (error) {
		next(error);
	}
};

// ✅ Login User
export const loginUser = async (req, res, next) => {
	try {
		const error = validateLoginData(req.body);
		if (error) return res.status(400).json({ message: error });

		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Incorrect email or password' });
		}

		user.token = generateToken(user._id, user.role);
		res.status(200).json(createUserResponse(user));
	} catch (error) {
		next(error);
	}
};

// ✅ Request Password Reset
export const requestPasswordReset = async (req, res) => {
	const { email } = req.body;
	const error = validateEmail(email);
	if (error) return res.status(400).json({ message: error });

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const resetToken = nanoid();
		user.resetToken = resetToken;
		user.resetTokenExpires = dayjs().add(1, 'hour').toDate();
		await user.save();

		const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
		const resetURL = `${frontendUrl}/reset-password?token=${resetToken}`;

		await sendPasswordResetEmail({
			to: user.email,
			name: user.name,
			resetURL,
		});

		res
			.status(200)
			.json({ message: 'Password reset link sent to your email.' });
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
	const error = validateResetPassword(req.body);
	if (error) return res.status(400).json({ message: error });

	try {
		const { resetToken, newPassword } = req.body;

		const user = await User.findOne({
			resetToken,
			resetTokenExpires: { $gt: new Date() },
		});

		if (!user) {
			return res
				.status(400)
				.json({ message: 'Invalid or expired reset request' });
		}

		user.password = newPassword;
		user.resetToken = undefined;
		user.resetTokenExpires = undefined;

		await user.save();
		res.status(200).json({ message: 'Password updated successfully.' });
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

// ✅ Set Admin Role
export const setAdminRole = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		user.isAdmin = true;
		await user.save();
		res
			.status(200)
			.json({ message: 'User has been granted administrative privileges.' });
	} catch (error) {
		next(error);
	}
};

// ✅ Toggle Admin Role

export const toggleAdminRole = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		user.role = user.role === 'admin' ? 'user' : 'admin';
		await user.save();

		const message =
			user.role === 'admin'
				? 'User has been promoted to admin.'
				: 'User has been demoted to user.';

		res.status(200).json({ message, role: user.role });
	} catch (error) {
		next(error);
	}
};

// ✅ Get All Users
export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find().select('-password');
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};
