// @ts-nocheck
// /utils/seoUtils.js

export const stripHtml = (html = '') =>
	html
		.replace(/<[^>]*>/g, '')
		.replace(/\s+/g, ' ')
		.trim();

export const truncate = (str = '', length = 160) =>
	str.length > length ? str.slice(0, length).trim() + '…' : str;

export const extractKeywords = (text = '') => {
	const stopWords = new Set([
		'the',
		'and',
		'for',
		'with',
		'that',
		'from',
		'this',
		'you',
		'are',
		'have',
		'was',
		'but',
		'they',
		'our',
		'your',
		'has',
		'not',
		'all',
		'can',
		'will',
		'just',
		'about',
		'more',
		'one',
		'their',
		'what',
		'when',
		'who',
		'how',
		'out',
		'into',
		'also',
		'get',
		'like',
		'had',
		'some',
		'been',
		'were',
		'them',
		'only',
		'its',
		'over',
		'those',
	]);

	return [
		...new Set(
			text
				.toLowerCase()
				.replace(/<[^>]*>/g, '')
				.match(/\b[a-z]{4,}\b/g)
				?.filter((word) => !stopWords.has(word)) || []
		),
	]
		.slice(0, 12)
		.join(', ');
};

export const getDefaultImage = () =>
	'https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png';

// Get earliest createdAt and latest updatedAt from a list
export const getSeoTimestamps = (items = []) => {
	if (!Array.isArray(items) || items.length === 0) {
		const now = new Date().toISOString();
		return {
			createdAt: now,
			updatedAt: now,
		};
	}

	const createdDates = items
		.map((item) => new Date(item.createdAt))
		.filter((d) => !isNaN(d));
	const updatedDates = items
		.map((item) => new Date(item.updatedAt))
		.filter((d) => !isNaN(d));

	return {
		createdAt: createdDates.length
			? new Date(Math.min(...createdDates)).toISOString()
			: new Date().toISOString(),
		updatedAt: updatedDates.length
			? new Date(Math.max(...updatedDates)).toISOString()
			: new Date().toISOString(),
	};
};
