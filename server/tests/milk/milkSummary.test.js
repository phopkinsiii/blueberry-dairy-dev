// @ts-nocheck
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import app from '../../server.js';
import MilkRecord from '../../models/milkModel.js';
import User from '../../models/userModel.js';

let mongoServer;
let token; // Test token

describe('Milk Summary API Tests (Protected Routes)', () => {
	beforeAll(async () => {
		// ✅ Start In-Memory MongoDB
		mongoServer = await MongoMemoryServer.create();
		const uri = mongoServer.getUri();
		await mongoose.connect(uri);

		// ✅ Create Test Admin User
		const testUser = await User.create({
			firstName: 'Test',
            lastName: 'User',
			email: 'admin@test.com',
			password: 'testpassword', // Password won't matter unless explicitly checked
			role: 'admin',
		});

		// ✅ Generate JWT Token for Test User
		token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		// ✅ Seed Milk Records
		await MilkRecord.insertMany([
			{
				goat: new mongoose.Types.ObjectId(),
				recordedAt: new Date('2024-01-01'),
				amount: 5,
			},
			{
				goat: new mongoose.Types.ObjectId(),
				recordedAt: new Date('2024-06-01'),
				amount: 10,
			},
			{
				goat: new mongoose.Types.ObjectId(),
				recordedAt: new Date('2023-07-15'),
				amount: 7,
			},
		]);
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
		await mongoServer.stop();
	});

	it('should return correct all-time milk total', async () => {
		const res = await request(app)
			.get('/api/milk/summary/all-time')
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toBe(200);
		expect(res.body.totalMilk).toBe(22); // 5 + 10 + 7
	});

	it('should return correct yearly milk summary', async () => {
		const res = await request(app)
			.get('/api/milk/summary/by-year')
			.set('Authorization', `Bearer ${token}`);

		expect(res.status).toBe(200);
		expect(res.body.summary.length).toBeGreaterThan(0);

		const years = res.body.summary.map((item) => item.year);
		expect(years).toContain(2024);
		expect(years).toContain(2023);
	});
});
