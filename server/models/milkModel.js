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
		amount: {
			type: Number,
			required: true,
		},
		notes: {
			type: String,
		},
	},
	{ timestamps: true }
);

// ✅ Indexes for performance
milkSchema.index({ recordedAt: -1 });
milkSchema.index({ goat: 1 });

const MilkRecord = mongoose.model('MilkRecord', milkSchema);

export default MilkRecord;
