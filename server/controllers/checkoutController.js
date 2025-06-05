// @ts-nocheck
// server/controllers/checkoutController.js

import dotenv from 'dotenv';
dotenv.config(); // ✅ Load environment variables before anything else

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY); // ✅ Initialize with secret key

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { cartItems } = req.body;

        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'No cart items provided' });
    }

    if (!process.env.CLIENT_URL) {
      throw new Error('CLIENT_URL not defined in environment');
    }

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe requires amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/confirmation`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('❌ Stripe session error:', error);
    res.status(500).json({ message: 'Checkout session creation failed' });
  }
};
