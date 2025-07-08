// @ts-nocheck
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/orderModel.js';
import { sendOrderConfirmationEmail } from '../utils/email/sendOrderEmail.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const truncate = (str, maxLength = 150) =>
	str?.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;

export const createCheckoutSession = async (req, res) => {
	try {
		const { form, cartItems } = req.body;

		if (!form || !cartItems?.length) {
			return res.status(400).json({ message: 'Missing form or cart data' });
		}

		console.log('💬 Received payload:', { form, cartItems });

		// Build line items for Stripe session
		const line_items = cartItems.map((item) => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: item.name,
					description: truncate(item.description || ''),
					images: item.imageSrc ? [item.imageSrc] : [],
				},
				unit_amount: Math.round(
					(item.selectedOption?.price || item.price || 0) * 100
				),
			},
			quantity: item.quantity || 1,
		}));

		const metadata = {
			email: form.email,
			name: form.name,
			pickupName: form.pickupName || form.name,
			pickupLocation: form.pickupLocation,
			pickupTime: form.pickupTime,
			cart: JSON.stringify(
				cartItems.map((item) => ({
					productId: item._id,
					name: item.name,
					quantity: item.quantity,
					price: item.price,
					size: item.selectedSize || '',
				}))
			),
		};

		const successUrl = `${process.env.FRONTEND_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`;

		const cancelUrl = `${process.env.FRONTEND_URL}/checkout?canceled=true`;

		console.log('🔁 success_url:', successUrl);
		console.log('🔁 cancel_url:', cancelUrl);

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items,
			metadata,
			success_url: successUrl,
			cancel_url: cancelUrl,
		});

		console.log('✅ Stripe session created:', session.id);
		res.status(200).json({ id: session.id });
	} catch (error) {
		console.error('❌ Error creating checkout session:', error);
		res.status(500).json({ message: 'Failed to create checkout session' });
	}
};
