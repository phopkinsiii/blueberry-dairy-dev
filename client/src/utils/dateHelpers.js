// src/utils/dateHelpers.js

export const formatDate = (input, options = {}) => {
	if (!input) return 'Unknown date';

	try {
		const date =
			typeof input === 'string'
				? new Date(input)
				: new Date(input?.$date || input);

		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			...options,
		});
	} catch (error) {
    console.error(error)
		console.warn('⚠️ Invalid date input:', input);
		return 'Invalid date';
	}
};

export const getAgeInYearsAndMonths = (dob) => {
	if (!dob) return 'Unknown age';

	try {
		const birthDate =
			typeof dob === 'string' ? new Date(dob) : new Date(dob?.$date || dob);
		const now = new Date();

		let years = now.getFullYear() - birthDate.getFullYear();
		let months = now.getMonth() - birthDate.getMonth();

		if (months < 0) {
			years--;
			months += 12;
		}

		if (years < 0) return 'Invalid age';

		const parts = [];
		if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
		if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);

		return parts.length > 0 ? parts.join(', ') : 'Less than 1 month';
	} catch (error) {
    console.error(error)
		console.warn('⚠️ Invalid DOB:', dob);
		return 'Invalid age';
	}
};
