// models/orderModel.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		name: { type: String, required: true },
		quantity: { type: Number, required: true },
		price: { type: Number, required: true },
		size: { type: String }, // Optional: for priceOptions like "Half-Gallon"
		image: { type: String }, // Optional: include image if needed in email
	},
	{ _id: false }
);

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null,
		},
		guest: {
			type: Boolean,
			default: true,
		},
		name: { type: String, required: true },
		email: { type: String, required: true },
		cartItems: [cartItemSchema],
		pickupName: { type: String, required: true },
		pickupLocation: {
			type: String,
			enum: ['Farm', 'Market', 'Other'],
			default: 'Farm',
		},
		pickupTime: { type: Date },
		stripeSessionId: { type: String, required: true },
		isFulfilled: { type: Boolean, default: false },
		inventoryAdjusted: { type: Boolean, default: false }, // ✅ Added
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
