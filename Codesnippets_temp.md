// @desc    Create a new milk record
// @route   POST /api/milk
// @access  Admin only
export const createMilkRecord = async (req, res) => {
	const { goatId, recordedAt, amount, notes, testDay } = req.body;

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
			testDay,
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