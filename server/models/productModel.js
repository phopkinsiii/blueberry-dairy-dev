import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const productSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		priceOptions: [
  {
    size: {
      type: String,
      enum: ['pint', 'quart', 'half-gallon', 'gallon', 'package', 'each', 'lb'],
      required: true,
    },
    price: { type: Number, required: true },
  },
],

		imageSrc: { type: String, required: true },
		imageAlt: { type: String },
		category: {
			type: String,
			enum: ['blueberries', 'apples', 'dairy', 'goats'],
			required: true,
		},
		stock: { type: Number, default: 0 },
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
