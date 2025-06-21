import mongoose from 'mongoose';

const goatSchema = new mongoose.Schema(
	{
		nickname: {
			type: String,
			required: [true, 'Nickname is required'],
			trim: true,
			minlength: [2, 'Nickname must be at least 2 characters'],
		},
		registeredName: {
			type: String,
			trim: true,
		},
		dob: {
			type: Date,
			required: [true, 'Date of birth is required'],
		},
		gender: {
			type: String,
			required: [true, 'Gender is required'],
			enum: {
				values: ['Doe', 'Buck', 'Wether'],
				message: 'Gender must be either Doe, Buck, or Wether',
			},
		},
		adgaId: {
			type: String,
			required: [true, 'ADGA ID is required'],
			match: [
				/^[A-Za-z0-9-]+$/,
				'ADGA ID may only contain letters, numbers, and dashes',
			],
			trim: true,
		},
		awards: [
			{
				type: String,
				trim: true,
			},
		],
		pedigree: {
			sire: { type: String, trim: true },
			dam: { type: String, trim: true },
			siresSire: { type: String, trim: true },
			siresDam: { type: String, trim: true },
			damsSire: { type: String, trim: true },
			damsDam: { type: String, trim: true },
		},
		dnaConfirmed: {
			type: Boolean,
			default: false,
		},
		disbudded: {
			type: Boolean,
			default: true, // ✅ Default to true for all goats
		},

		forSale: {
			type: Boolean,
			default: false,
		},
		price: {
			type: Number,
			min: [0, 'Price must be a positive number'],
		},
		additionalInfo: {
			type: String,
			trim: true,
		},
		images: [
			{
				type: String,
				validate: {
					validator: function (v) {
						return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(v);
					},
					message:
						'Image must be a valid URL ending in jpg, jpeg, png, or webp',
				},
			},
		],
	},
	{ timestamps: true }
);

const Goat = mongoose.model('Goat', goatSchema);
export default Goat;
