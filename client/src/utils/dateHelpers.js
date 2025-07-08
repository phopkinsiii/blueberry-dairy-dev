import {
	parseISO,
	format,
	differenceInYears,
	differenceInMonths,
	isValid,
	compareDesc,
} from 'date-fns';

/**
 * Formats a date string or object to 'MMMM d, yyyy' by default.
 * Example: "2025-07-02T08:30:00Z" → "July 2, 2025"
 */
export const formatDate = (input, pattern = 'MMMM d, yyyy') => {
	if (!input) return 'Unknown date';

	try {
		const date =
			typeof input === 'string'
				? parseISO(input)
				: new Date(input?.$date || input);

		if (!isValid(date)) throw new Error('Invalid date');
		return format(date, pattern);
	} catch (error) {
		console.error(error);
		console.warn('⚠️ Invalid date input:', input);
		return 'Invalid date';
	}
};

/**
 * Returns time formatted as 'HH:mm' (24h) or 'hh:mm a' (12h).
 * Set use24Hour = true for 24h time.
 */
// export const formatTime = (input, { use24Hour = false } = {}) => {
// 	if (!input) return 'Unknown time';

// 	try {
// 		const date =
// 			typeof input === 'string'
// 				? parseISO(input)
// 				: new Date(input?.$date || input);

// 		if (!isValid(date)) throw new Error('Invalid date');

// 		const pattern = use24Hour ? 'HH:mm' : 'hh:mm a';
// 		return format(date, pattern);
// 	} catch (error) {
// 		console.error(error);
// 		console.warn('⚠️ Invalid time input:', input);
// 		return 'Invalid time';
// 	}
// };

export const formatTime = (input, { use24Hour = false } = {}) => {
	if (!input) return 'Unknown time';

	try {
		const date =
			typeof input === 'string'
				? new Date(input) // ← Use Date constructor here for full time zone parsing
				: new Date(input?.$date || input);

		if (!isValid(date)) throw new Error('Invalid date');

		const pattern = use24Hour ? 'HH:mm' : 'hh:mm a';
		return format(date, pattern);
	} catch (error) {
		console.error(error);
		console.warn('⚠️ Invalid time input:', input);
		return 'Invalid time';
	}
};

/**
 * Converts input to ISO format date string for use in <input type="date" />.
 * Output: "YYYY-MM-DD"
 */
export const toInputDateFormat = (input) => {
	if (!input) return '';

	try {
		const date =
			typeof input === 'string'
				? parseISO(input)
				: new Date(input?.$date || input);

		if (!isValid(date)) throw new Error('Invalid date');
		return format(date, 'yyyy-MM-dd');
	} catch (error) {
		console.error(error);
		console.warn('⚠️ Invalid date input for form:', input);
		return '';
	}
};

/**
 * Calculates and returns a human-readable age in years and months.
 * Example: "3 years, 2 months"
 */
export const getAgeInYearsAndMonths = (dob) => {
	if (!dob) return 'Unknown age';

	try {
		const birthDate =
			typeof dob === 'string' ? parseISO(dob) : new Date(dob?.$date || dob);
		const now = new Date();

		if (!isValid(birthDate)) throw new Error('Invalid DOB');

		let years = differenceInYears(now, birthDate);
		let months = differenceInMonths(now, birthDate) % 12;

		if (birthDate > now) return 'Invalid age';

		const parts = [];
		if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
		if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);

		return parts.length > 0 ? parts.join(', ') : 'Less than 1 month';
	} catch (error) {
		console.error(error);
		console.warn('⚠️ Invalid DOB:', dob);
		return 'Invalid age';
	}
};

export const sortByDateDescending = (records, dateField = 'recordedAt') => {
	return [...records].sort((a, b) =>
		compareDesc(parseISO(a[dateField]), parseISO(b[dateField]))
	);
};
