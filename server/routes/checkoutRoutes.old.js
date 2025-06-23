// @ts-nocheck
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/checkout/create-session
router.post('/create-session', async (req, res) => {
	const { form, cartItems } = req.body;

	console.log('📦 Incoming checkout request');
	console.log('🧾 cartItems:', cartItems);
	console.log('🙋 form:', form);

	try {
		// Metadata must be flat strings (no nested objects)
		const metadata = {
			name: form.name || '',
			email: form.email || '',
			pickupName: form.name || '',
			pickupLocation: form.pickupLocation || 'Farm',
			pickupTime: form.pickupTime || new Date().toISOString(),
			cart: JSON.stringify(
				cartItems.map((item) => ({
					name: item.name,
					quantity: item.quantity,
					price: item.price,
					selectedSize: item.selectedSize,
					productId: item._id,
				}))
			),
		};
		console.log('🧠 Metadata sent to Stripe:', metadata);

		const lineItems = cartItems.map((item) => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: `${item.name} (${item.selectedSize})`,
					description: item.description?.slice(0, 150) || '',
					images: item.imageSrc ? [item.imageSrc] : [], // ✅ Use as-is if it's already a full URL
				},
				unit_amount: Math.round(item.price * 100),
			},
			quantity: item.quantity,
		}));

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: lineItems,
			customer_email: form.email || '', // ✅ This is what populates session.customer_email
			metadata, // ✅ Sent to the webhook as `session.metadata`
			success_url: `${process.env.CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/cart`,
		});

		res.json({ id: session.id, url: session.url });
	} catch (err) {
		console.error('❌ Stripe session creation error:', err.message);
		res.status(500).json({ error: 'Stripe session creation failed' });
	}
});

export default router;
