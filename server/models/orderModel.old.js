// @ts-nocheck
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function () {
        return !this.guest;
      },
    },
    guest: {
      type: Boolean,
      default: false,
    },
    name: String,
    email: String,

    cartItems: [
      {
        productId: String, // Optional: null for guest or Stripe-based orders
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // price per unit in dollars
        size: String, // ✅ optional: supports "gallon", "pint", etc.
        image: String, // Optional: URL or relative path
      },
    ],

    pickupName: {
      type: String,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
      enum: ['Farm', 'Knoxville Market', 'Dandridge'],
    },
    pickupTime: {
      type: Date,
      required: true,
    },
    stripeSessionId: String, // ✅ optional: used to track the Stripe session
  },
  {
    timestamps: true,
    collection: 'test' // Explicitly specify the collection name
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
