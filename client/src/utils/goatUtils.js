export function filterDoesOverOneYear(goats) {
	const today = new Date();
	const oneYearAgo = new Date(today);
	oneYearAgo.setFullYear(today.getFullYear() - 1);

	return goats.filter((goat) => {
		const isDoe = goat.gender?.toLowerCase() === 'doe';
		const dob = new Date(goat.dob);
		const isOverOneYear = dob <= oneYearAgo;
		return isDoe && isOverOneYear;
	});
}

