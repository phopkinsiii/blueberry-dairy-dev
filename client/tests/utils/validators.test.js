// @ts-nocheck
import { describe, it, expect } from 'vitest';
import {
	validateContactForm,
	validateRegisterData,
	validateLoginData,
	validateStrongPassword,
	getPasswordStrength,
	validateGoatForm,
	validateProductForm,
} from '../../src/utils/validators';

describe('validators', () => {
	describe('validateContactForm', () => {
		it('returns error for missing required fields', () => {
			const result = validateContactForm({});
			expect(result).toBe('All fields except company are required.');
		});

		it('returns error for invalid email', () => {
			const result = validateContactForm({
				firstName: 'John',
				lastName: 'Doe',
				email: 'invalid-email',
				subject: 'Test',
				message: 'Hello there!',
			});
			expect(result).toBe('A valid email address is required.');
		});

		it('returns null for valid input', () => {
			const result = validateContactForm({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				subject: 'Test',
				message: 'Hello there, this is a long enough message!',
			});
			expect(result).toBeNull();
		});
	});

	describe('validateRegisterData', () => {
		it('returns error for weak password', () => {
			const result = validateRegisterData({
				firstName: 'Jane',
				lastName: 'Doe',
				email: 'jane@example.com',
				password: 'weakpass',
			});
			expect(result).toContain('uppercase');
		});

		it('passes for strong password', () => {
			const result = validateRegisterData({
				firstName: 'Jane',
				lastName: 'Doe',
				email: 'jane@example.com',
				password: 'StrongP@ss1',
			});
			expect(result).toBeNull();
		});
	});

	describe('validateLoginData', () => {
		it('returns error for missing fields', () => {
			const result = validateLoginData({ email: '', password: '' });
			expect(result).toBe('Email and password are required.');
		});

		it('returns error for bad email', () => {
			const result = validateLoginData({
				email: 'bademail',
				password: 'password',
			});
			expect(result).toBe('Please enter a valid email address.');
		});

		it('passes with valid email and password', () => {
			const result = validateLoginData({
				email: 'valid@email.com',
				password: 'secret',
			});
			expect(result).toBeNull();
		});
	});

	describe('validateStrongPassword', () => {
		it('detects missing requirements', () => {
			const result = validateStrongPassword('weakpass');
			expect(result).toContain('uppercase');
		});

		it('passes for strong password', () => {
			const result = validateStrongPassword('StrongP@ss1');
			expect(result).toBeNull();
		});
	});

	describe('getPasswordStrength', () => {
		it('classifies weak password', () => {
			const { strength } = getPasswordStrength('abc');
			expect(strength).toBe('Weak');
		});

		it('classifies strong password', () => {
			const { strength } = getPasswordStrength('StrongP@ss1');
			expect(strength).toBe('Strong');
		});
	});
});

describe('validateProductForm', () => {
	it('returns error for missing fields', () => {
		const result = validateProductForm({});
		expect(result).toBe(
			'Name, description, category, and at least one price option are required.'
		);
	});

	it('returns error for missing size or invalid price in priceOptions', () => {
		const result = validateProductForm({
			name: 'Milk',
			description: 'Fresh milk',
			category: 'Dairy',
			priceOptions: [{ size: '', price: 'abc' }],
		});
		expect(result).toBe(
			'Each price option must include a size and a numeric price.'
		);
	});

	it('passes for valid product data', () => {
		const result = validateProductForm({
			name: 'Milk',
			description: 'Fresh milk',
			category: 'Dairy',
			priceOptions: [{ size: '1L', price: 5 }],
		});
		expect(result).toBeNull();
	});
});

describe('validateGoatForm', () => {
	it('returns multiple errors for missing required fields', () => {
		const result = validateGoatForm({});
		expect(result).toMatchObject({
			nickname: 'Nickname is required.',
			dob: 'Date of birth is required.',
			gender: 'Gender is required.',
			adgaId: 'ADGA ID is required.',
		});
	});

	it('returns error for invalid date of birth', () => {
		const result = validateGoatForm({
			nickname: 'Rico',
			dob: 'invalid-date',
			gender: 'Doe',
			adgaId: '12345',
		});
		expect(result.dob).toBe('Invalid date format.');
	});

	it('returns error for invalid gender', () => {
		const result = validateGoatForm({
			nickname: 'Rico',
			dob: '2024-01-01',
			gender: 'Invalid',
			adgaId: '12345',
		});
		expect(result.gender).toBe('Gender must be either Doe, Buck, or Wether.');
	});

	it('returns error for invalid ADGA ID', () => {
		const result = validateGoatForm({
			nickname: 'Rico',
			dob: '2024-01-01',
			gender: 'Buck',
			adgaId: 'invalid id!',
		});
		expect(result.adgaId).toBe(
			'ADGA ID may only contain letters, numbers, and dashes.'
		);
	});

	it('returns price error if goat is for sale with invalid price', () => {
		const result = validateGoatForm({
			nickname: 'Rico',
			dob: '2024-01-01',
			gender: 'Doe',
			adgaId: 'PD2441072',
			forSale: true,
			price: 'abc',
		});
		expect(result.price).toBe(
			'Valid price is required if the goat is for sale.'
		);
	});

	it('passes for valid goat data', () => {
		const result = validateGoatForm({
			nickname: 'Rico',
			dob: '2024-01-01',
			gender: 'Buck',
			adgaId: 'PD2441072',
			forSale: true,
			price: 400,
		});
		expect(result).toEqual({});
	});
});
