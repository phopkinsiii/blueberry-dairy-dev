// server/controllers/milkController.js
import MilkRecord from '../models/milkModel.js';
import Goat from '../models/goatModel.js';
import { validateMilkRecord } from '../utils/validators.js';

// @desc    Get all milk records
// @route   GET /api/milk
// @access  Public
export const getAllMilkRecords = async (req, res) => {
	try {
		const records = await MilkRecord.find()
			.populate('goat', 'nickname registeredName gender dob')
			.sort({ recordedAt: -1 });
		res.status(200).json(records);
	} catch (error) {
		console.error('❌ Error fetching milk records:', error);
		res.status(500).json({ message: 'Server error fetching milk records' });
	}
};

// @desc    Create a new milk record
// @route   POST /api/milk
// @access  Admin only

export const createMilkRecord = async (req, res) => {
	const { goatId, recordedAt, amount, notes } = req.body;

	const { isValid, errors } = await validateMilkRecord({
		goatId,
		recordedAt,
		amount,
	});
	if (!isValid) {
		return res.status(400).json({ message: errors.join(' ') });
	}

	try {
		const newRecord = new MilkRecord({
			goat: goatId,
			recordedAt,
			amount,
			notes,
		});

		await newRecord.save();
		const populated = await newRecord.populate(
			'goat',
			'nickname registeredName gender dob'
		);

		res.status(201).json(populated);
	} catch (error) {
		console.error('❌ Error creating milk record:', error);
		res.status(500).json({ message: 'Error creating milk record' });
	}
};

// @desc    Update a milk record
// @route   PUT /api/milk/:id
// @access  Admin only
export const updateMilkRecord = async (req, res) => {
	const { goatId, recordedAt, amount, notes } = req.body;

	const { isValid, errors } = await validateMilkRecord(
		{ goatId, recordedAt, amount },
		true
	);
	if (!isValid) {
		return res.status(400).json({ message: errors.join(' ') });
	}

	try {
		const record = await MilkRecord.findById(req.params.id);
		if (!record) {
			return res.status(404).json({ message: 'Milk record not found' });
		}

		if (goatId) record.goat = goatId;
		if (recordedAt) record.recordedAt = recordedAt;
		if (amount !== undefined) record.amount = amount;
		if (notes !== undefined) record.notes = notes;

		await record.save();
		const updated = await record.populate(
			'goat',
			'nickname registeredName gender dob'
		);

		res.status(200).json(updated);
	} catch (error) {
		console.error('❌ Error updating milk record:', error);
		res.status(500).json({ message: 'Error updating milk record' });
	}
};

// @desc    Delete a milk record
// @route   DELETE /api/milk/:id
// @access  Admin only
export const deleteMilkRecord = async (req, res) => {
	try {
		const record = await MilkRecord.findById(req.params.id);
		if (!record) {
			return res.status(404).json({ message: 'Milk record not found' });
		}

		await record.deleteOne();
		res.status(200).json({ message: 'Milk record deleted successfully' });
	} catch (error) {
		console.error('❌ Error deleting milk record:', error);
		res.status(500).json({ message: 'Error deleting milk record' });
	}
};

// @desc    Get milk records for a specific goat
// @route   GET /api/milk/goat/:goatId
// @access  Public
export const getMilkRecordsByGoat = async (req, res) => {
	const { goatId } = req.params;

	try {
		const records = await MilkRecord.find({ goat: goatId })
			.populate('goat', 'nickname registeredName gender dob')
			.sort({ recordedAt: -1 });

		res.status(200).json(records);
	} catch (error) {
		console.error('❌ Error fetching goat milk records:', error);
		res.status(500).json({ message: 'Error fetching goat milk records' });
	}
};

// @desc    Get summary of total milk per goat per year
// @route   GET /api/milk/summary
// @access  Public
export const getMilkSummary = async (req, res) => {
	try {
		const summary = await MilkRecord.aggregate([
			{
				$lookup: {
					from: 'goats',
					localField: 'goat',
					foreignField: '_id',
					as: 'goatData',
				},
			},
			{ $unwind: '$goatData' },
			{
				$group: {
					_id: {
						goat: '$goatData._id',
						year: { $year: '$recordedAt' },
					},
					total: { $sum: '$amount' },
					count: { $sum: 1 },
					goatNickname: { $first: '$goatData.nickname' },
					goatRegisteredName: { $first: '$goatData.registeredName' },
				},
			},
			{ $sort: { '_id.year': -1, goatNickname: 1 } },
		]);

		res.status(200).json(summary);
	} catch (error) {
		console.error('❌ Error generating milk summary:', error);
		res.status(500).json({ message: 'Error generating milk summary' });
	}
};

// @desc    Get summary of milk production for a specific goat
// @route   GET /api/milk/goat/:goatId/summary
// @access  Public
export const getGoatMilkSummary = async (req, res) => {
	const { goatId } = req.params;

	try {
		// Fetch all milk records for this goat
		const records = await MilkRecord.find({ goat: goatId });

		if (!records.length) {
			return res
				.status(404)
				.json({ message: 'No milk records found for this goat' });
		}

		// Group by year
		const yearlyData = {};

		for (const record of records) {
			const year = new Date(record.recordedAt).getFullYear();

			if (!yearlyData[year]) {
				yearlyData[year] = {
					total: 0,
					count: 0,
					days: new Set(),
				};
			}

			yearlyData[year].total += record.amount;
			yearlyData[year].count += 1;
			yearlyData[year].days.add(record.recordedAt.toISOString().split('T')[0]); // track unique days
		}

		// Format summary
		const summary = Object.entries(yearlyData).map(([year, data]) => ({
			year: Number(year),
			total: parseFloat(data.total.toFixed(2)),
			averagePerDay: parseFloat((data.total / data.days.size).toFixed(3)),
			daysMilked: data.days.size,
			entries: data.count,
		}));

		// Sort descending by year
		summary.sort((a, b) => b.year - a.year);

		// Lifetime totals
		const lifetimeTotal = summary.reduce((acc, yr) => acc + yr.total, 0);
		const lifetimeDays = summary.reduce((acc, yr) => acc + yr.daysMilked, 0);

		res.status(200).json({
			goatId,
			lifetimeTotal: parseFloat(lifetimeTotal.toFixed(2)),
			lifetimeAveragePerDay: parseFloat(
				(lifetimeTotal / lifetimeDays).toFixed(3)
			),
			years: summary,
		});
	} catch (error) {
		console.error('❌ Error generating goat milk summary:', error);
		res.status(500).json({ message: 'Error generating goat milk summary' });
	}
};
