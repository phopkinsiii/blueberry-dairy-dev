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
				.match(/\b[a-z]{4,}\b/g) // 4+ letter words
				?.filter((word) => !stopWords.has(word)) || []
		),
	]
		.slice(0, 12)
		.join(', ');
};
