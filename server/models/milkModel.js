// server/models/milkModel.js
import mongoose from 'mongoose';

const milkSchema = new mongoose.Schema(
	{
		goat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Goat',
			required: true,
		},
		recordedAt: {
			type: Date,
			required: [true, 'Date and time of milking is required'],
		},
		amount: { type: Number, required: true }, // e.g., in ounces or liters
		notes: { type: String },
	},
	{ timestamps: true }
);

const MilkRecord = mongoose.model('MilkRecord', milkSchema);

export default MilkRecord;
