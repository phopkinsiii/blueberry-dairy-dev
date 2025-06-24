// server/controllers/webhookController.js
// @ts-nocheck
import Stripe from 'stripe';
import Order from '../models/orderModel.js';
import { sendOrderConfirmationEmail } from '../utils/email/sendOrderEmail.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
	const sig = req.headers['stripe-signature'];
	let event;

	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		);
		console.log('⚡ Webhook received:', event.type);
	} catch (err) {
		console.error('❌ Webhook signature verification failed.', err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object;
		const metadata = session.metadata;

		console.log('📦 Parsed Metadata:', metadata);

		try {
			const parsedCart = JSON.parse(metadata.cart || '[]');

			console.log('🛒 Parsed Cart Items:', parsedCart);

			const newOrder = new Order({
				user: null,
				guest: true,
				name: metadata.pickupName || metadata.name,
				email: metadata.email || '',
				cartItems: parsedCart.map((item) => ({
					productId: item.productId,
					name: item.name,
					quantity: item.quantity,
					price: item.price,
					size: item.size || '',
				})),
				pickupName: metadata.pickupName,
				pickupLocation: metadata.pickupLocation,
				pickupTime: metadata.pickupTime,
				stripeSessionId: session.id,
			});

			const savedOrder = await newOrder.save();
			console.log('✅ Order saved to MongoDB');

			// 📧 Customer email
			await sendOrderConfirmationEmail({
				to: savedOrder.email,
				subject: 'Order Confirmation from Blueberry Dairy',
				name: savedOrder.name,
				cartItems: savedOrder.cartItems,
				pickupName: savedOrder.pickupName,
				pickupLocation: savedOrder.pickupLocation,
				pickupTime: savedOrder.pickupTime,
			});

			// 📧 Admin copy
			await sendOrderConfirmationEmail({
				to: process.env.ADMIN_EMAIL,
				subject: 'New Order Received at Blueberry Dairy',
				name: savedOrder.name,
				cartItems: savedOrder.cartItems,
				pickupName: savedOrder.pickupName,
				pickupLocation: savedOrder.pickupLocation,
				pickupTime: savedOrder.pickupTime,
				isAdminCopy: true,
			});
		} catch (err) {
			console.error('❌ Failed to save order or send email:', err.message);
			console.log('🧪 Failed Order Data:', {
				user: null,
				guest: true,
				name: metadata.pickupName || metadata.name,
				email: metadata.email || '',
				cartItems: JSON.parse(metadata.cart || '[]'),
				pickupName: metadata.pickupName,
				pickupLocation: metadata.pickupLocation,
				pickupTime: metadata.pickupTime,
				stripeSessionId: session.id,
				isFulfilled: false,
			});
		}
	} else {
		console.log('ℹ️ Unhandled event type:', event.type);
	}

	res.status(200).send('Webhook received');
};
