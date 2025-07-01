// server/controllers/webhookController.js
// @ts-nocheck
import Stripe from 'stripe';
import Order from '../models/orderModel.js';
import { sendOrderConfirmationEmail } from '../utils/email/sendOrderEmail.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
	try {
		const sig = req.headers['stripe-signature'];
		const event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		);

		console.log('⚡ Webhook received:', event.type);
//The  below adds mock data for a test order. Do not add this to the live app!
		if (event.type === 'checkout.session.completed') {
			const session = event.data.object;

			// 🧪 DEV PATCH: Inject mock metadata if missing (from `stripe trigger`)
			if (
				process.env.NODE_ENV === 'development' &&
				(!session.metadata || !session.metadata.cart)
			) {
				console.log('⚠️ No metadata in test event. Injecting mock data...');
				session.metadata = {
					name: 'Test User',
					email: 'test@example.com',
					pickupName: 'Test User',
					pickupLocation: 'Farm',
					pickupTime: new Date().toISOString(),
					cart: JSON.stringify([
						{
							productId: 'fakeId123',
							name: 'Raw Goat Milk',
							quantity: 2,
							price: 6.5,
							size: '1/2 gallon',
						},
					]),
				};
			}

			// ✅ Extract metadata
			const {
				email,
				name,
				pickupName,
				pickupLocation,
				pickupTime,
				cart: cartString,
			} = session.metadata || {};

			if (!email || !name || !cartString) {
				console.error('❌ Missing metadata in webhook:', session.metadata);
				return res.status(400).send('Missing order metadata');
			}

			const cartItems = JSON.parse(cartString);

			const order = new Order({
				user: null,
				guest: true,
				name,
				email,
				cartItems,
				pickupName,
				pickupLocation,
				pickupTime,
				stripeSessionId: session.id,
			});

			await order.save();
			console.log('✅ Order saved from Stripe webhook:', order._id);

			// Send emails
			await sendOrderConfirmationEmail({
				to: email,
				subject: 'Your Blueberry Dairy Order Confirmation',
				name,
				cartItems,
				pickupName,
				pickupLocation,
				pickupTime,
			});

			await sendOrderConfirmationEmail({
				to: process.env.ADMIN_EMAIL,
				subject: 'New Blueberry Dairy Order Received',
				name,
				cartItems,
				pickupName,
				pickupLocation,
				pickupTime,
				isAdminCopy: true,
			});
		}

		res.status(200).send('Webhook received');
	} catch (err) {
		console.error('❌ Webhook error:', err.message);
		res.status(400).send(`Webhook Error: ${err.message}`);
	}
};
