import validator from 'validator';

export const validateContactForm = ({
	firstName,
	lastName,
	email,
	subject,
	message,
}) => {
	if (
		!firstName?.trim() ||
		!lastName?.trim() ||
		!email ||
		!subject?.trim() ||
		!message?.trim()
	) {
		return 'All fields except company are required.';
	}

	if (!validator.isEmail(email)) {
		return 'A valid email address is required.';
	}

	if (!validator.isLength(message, { min: 10 })) {
		return 'Message must be at least 10 characters long.';
	}

	return null;
};

export const validateProductForm = ({
	name,
	description,
	priceOptions,
	category,
}) => {
	if (
		!name ||
		!description ||
		!category ||
		!Array.isArray(priceOptions) ||
		priceOptions.length === 0
	) {
		return 'Name, description, category, and at least one price option are required.';
	}

	for (let option of priceOptions) {
		if (!option.size || isNaN(option.price)) {
			return 'Each price option must include a size and a numeric price.';
		}
	}

	return null;
};

// Register field validators

export const validateRegisterData = ({
	firstName,
	lastName,
	email,
	password,
}) => {
	if (!firstName?.trim()) return 'First name is required.';
	if (!lastName?.trim()) return 'Last name is required.';
	if (!email?.trim()) return 'Email is required.';
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
		return 'Please enter a valid email address.';
	if (!password?.trim()) return 'Password is required.';
	if (password.length < 8) return 'Password must be at least 8 characters.';
	if (!/[A-Z]/.test(password))
		return 'Password must include at least one uppercase letter.';
	if (!/[a-z]/.test(password))
		return 'Password must include at least one lowercase letter.';
	if (!/[0-9]/.test(password))
		return 'Password must include at least one number.';
	if (!/[^A-Za-z0-9]/.test(password))
		return 'Password must include at least one special character.';

	return null;
};

export const validateLoginData = ({ email, password }) => {
	if (!email || !password) {
		return 'Email and password are required.';
	}
	// Simple email format check
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(email)) {
		return 'Please enter a valid email address.';
	}
	return null;
};

export const validateStrongPassword = (password) => {
	if (!password || password.length < 8) {
		return 'Password must be at least 8 characters long.';
	}

	if (!/[A-Z]/.test(password)) {
		return 'Password must include at least one uppercase letter.';
	}

	if (!/[a-z]/.test(password)) {
		return 'Password must include at least one lowercase letter.';
	}

	if (!/\d/.test(password)) {
		return 'Password must include at least one number.';
	}

	if (!/[\W_]/.test(password)) {
		return 'Password must include at least one special character.';
	}

	return null;
};

export const getPasswordStrength = (password) => {
	const checks = {
		length: password.length >= 8,
		uppercase: /[A-Z]/.test(password),
		lowercase: /[a-z]/.test(password),
		number: /\d/.test(password),
		symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
	};

	const passed = Object.values(checks).filter(Boolean).length;
	let strength = '';
	if (passed <= 2) strength = 'Weak';
	else if (passed === 3 || passed === 4) strength = 'Moderate';
	else strength = 'Strong';

	return { checks, strength };
};

export const validateGoatForm = (formData) => {
	const errors = {};

	if (!formData.nickname?.trim()) {
		errors.nickname = 'Nickname is required.';
	}

	if (!formData.dob) {
		errors.dob = 'Date of birth is required.';
	} else if (isNaN(Date.parse(formData.dob))) {
		errors.dob = 'Invalid date format.';
	}

	if (!formData.gender?.trim()) {
		errors.gender = 'Gender is required.';
	} else if (!['Doe', 'Buck', 'Wether'].includes(formData.gender)) {
		errors.gender = 'Gender must be either Doe, Buck, or Wether.';
	}

	if (!formData.adgaId?.trim()) {
		errors.adgaId = 'ADGA ID is required.';
	} else if (!/^[A-Za-z0-9-]+$/.test(formData.adgaId)) {
		errors.adgaId = 'ADGA ID may only contain letters, numbers, and dashes.';
	}

	if (formData.forSale) {
		if (
			formData.price === undefined ||
			formData.price === null ||
			isNaN(formData.price)
		) {
			errors.price = 'Valid price is required if the goat is for sale.';
		} else if (Number(formData.price) < 0) {
			errors.price = 'Price must be a positive number.';
		}
	}

	return errors;
};
