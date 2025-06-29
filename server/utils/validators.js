// utils/validators.js
import validator from 'validator';

// ✅ Validate Email
export const validateEmail = (email) => {
	if (!email || !validator.isEmail(email)) {
		return 'A valid email is required.';
	}
	return null;
};

// ✅ Validate Password Strength
export const validatePassword = (password) => {
	if (!password || !validator.isStrongPassword(password)) {
		return 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.';
	}
	return null;
};

export const validateContactForm = ({
	firstName,
	lastName,
	email,
	subject,
	message,
}) => {
	if (!firstName || validator.isEmpty(firstName.trim())) {
		return 'First name is required.';
	}
	if (!lastName || validator.isEmpty(lastName.trim())) {
		return 'Last name is required.';
	}
	if (!email || !validator.isEmail(email)) {
		return 'A valid email address is required.';
	}
	if (!subject || validator.isEmpty(subject.trim())) {
		return 'Subject is required.';
	}
	if (!message || validator.isEmpty(message.trim())) {
		return 'Message is required.';
	}
	if (!validator.isLength(message, { min: 10 })) {
		return 'Message must be at least 10 characters long.';
	}
	return null;
};

// ✅ Validate Registration Fields
export const validateRegisterData = ({
	firstName,
	lastName,
	email,
	password,
}) => {
	if (!firstName?.trim() || !lastName?.trim() || !email || !password) {
		return 'All fields are required.';
	}

	if (firstName.trim().length < 2 || lastName.trim().length < 2) {
		return 'First and last name must be at least 2 characters.';
	}

	const emailError = validateEmail(email);
	if (emailError) return emailError;

	const passwordError = validatePassword(password);
	if (passwordError) return passwordError;

	return null;
};

// ✅ Validate Login Fields
export const validateLoginData = ({ email, password }) => {
	if (!email || !password) {
		return 'Email and password are required.';
	}
	return validateEmail(email); // returns null or error message
};

// ✅ Validate Password Reset
export const validateResetPassword = ({ resetToken, newPassword }) => {
	if (!resetToken || !newPassword) {
		return 'Reset token and new password are required.';
	}
	const passwordError = validatePassword(newPassword);
	if (passwordError) return passwordError;
	return null;
};

// ✅ Validate Product Fields
export const validateProductData = ({
	name,
	description,
	priceOptions,
	category,
}) => {
	if (
		!name ||
		!description ||
		!priceOptions ||
		!Array.isArray(priceOptions) ||
		priceOptions.length === 0
	) {
		return 'Name, description, category, and at least one price option are required.';
	}

	if (!category) {
		return 'Product category is required.';
	}

	for (let option of priceOptions) {
		if (!option.size || typeof option.price !== 'number') {
			return 'Each price option must include a size and a numeric price.';
		}
	}

	return null;
};

// server/validators.js
// ✅ Validate Goat Fields
export const validateGoatData = (data) => {
	const errors = [];

	// Required fields
	if (!data.nickname || typeof data.nickname !== 'string') {
		errors.push('Nickname is required and must be a string.');
	}

	if (!data.dob || isNaN(Date.parse(data.dob))) {
		errors.push('Date of birth (dob) is required and must be a valid date.');
	}

	if (!data.gender || !['Buck', 'Doe', 'Wether'].includes(data.gender)) {
		errors.push('Gender is required and must be one of: male, female, wether.');
	}

	if (!data.adgaId || typeof data.adgaId !== 'string') {
		errors.push('ADGA ID is required and must be a string.');
	}

	// Optional fields
	if (data.price && isNaN(Number(data.price))) {
		errors.push('Price must be a valid number.');
	}

	if (data.awards && !Array.isArray(data.awards)) {
		errors.push('Awards must be an array of strings.');
	}

	if (data.images && !Array.isArray(data.images)) {
		errors.push('Images must be an array of image URLs.');
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};

// ✅ Validate Milk Record
import Goat from '../models/goatModel.js';

export const validateMilkRecord = async ({ goatId, recordedAt, amount }, isUpdate = false) => {
	const errors = [];

	if (!goatId) {
		errors.push('Goat ID is required.');
	} else {
		try {
			const goat = await Goat.findById(goatId);
			if (!goat) {
				errors.push('Goat not found.');
			} else if (goat.gender !== 'Doe') {
				errors.push('Milk records can only be associated with does.');
			}
		} catch (err) {
			errors.push('Invalid goat ID format.');
		}
	}

	if (!isUpdate || recordedAt) {
		if (!recordedAt || isNaN(Date.parse(recordedAt))) {
			errors.push('Valid milking date and time is required.');
		}
	}

	if (!isUpdate || amount !== undefined) {
		if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
			errors.push('Amount must be a positive number.');
		}
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};
