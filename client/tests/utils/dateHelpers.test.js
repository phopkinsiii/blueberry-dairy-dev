import { describe, it, expect } from 'vitest';
import {
	formatDate,
	formatTime,
	toInputDateFormat,
	getAgeInYearsAndMonths,
	sortByDateDescending,
} from '../../src/utils/dateHelpers';

describe('dateHelpers', () => {
	describe('formatDate', () => {
		it('formats valid ISO date string correctly', () => {
			expect(formatDate('2025-07-04')).toBe('July 4, 2025');
		});

		it('returns "Unknown date" if input is missing', () => {
			expect(formatDate(undefined)).toBe('Unknown date');
		});

		it('returns "Invalid date" for bad input', () => {
			expect(formatDate('invalid-date')).toBe('Invalid date');
		});
	});

	describe('getAgeInYearsAndMonths', () => {
		it('returns correct age in years and months', () => {
			const dob = new Date();
			dob.setFullYear(dob.getFullYear() - 3);
			dob.setMonth(dob.getMonth() - 2); // 3 years, 2 months ago
			expect(getAgeInYearsAndMonths(dob.toISOString())).toContain('3 year');
		});

		it('returns "Unknown age" for missing DOB', () => {
			expect(getAgeInYearsAndMonths(null)).toBe('Unknown age');
		});

		it('returns "Invalid age" for future DOB', () => {
			const futureDate = new Date();
			futureDate.setFullYear(futureDate.getFullYear() + 1);
			expect(getAgeInYearsAndMonths(futureDate.toISOString())).toBe(
				'Invalid age'
			);
		});
	});
});
