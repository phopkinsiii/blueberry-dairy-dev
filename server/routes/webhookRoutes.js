// @ts-nocheck
// routes/webhookRoutes.js
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/orderModel.js';
import { sendOrderConfirmationEmail } from '../utils/sendEmail.js';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Use raw body parser ONLY for this route
router.post(
	'/',
	express.raw({ type: 'application/json' }),
	async (req, res) => {
		console.log('⚡ Webhook received');
		const sig = req.headers['stripe-signature'];

		let event;

		try {
			event = stripe.webhooks.constructEvent(
				req.body,
				sig,
				process.env.STRIPE_WEBHOOK_SECRET
			);
		} catch (err) {
			console.error('❌ Webhook signature verification failed:', err.message);
			return res.status(400).send(`Webhook Error: ${err.message}`);
		}

		// ✅ Handle the event
		if (event.type === 'checkout.session.completed') {
			const session = event.data.object;

			console.log('✅ Payment succeeded:', session.id);

			const metadata = session.metadata || {};
			let cartItems = [];

			try {
				console.log('🛍️ Raw metadata.cart:', metadata.cart);

				cartItems = JSON.parse(session.metadata.cart || '[]');
				console.log('🧾 Parsed cartItems from metadata:', cartItems);
			} catch (err) {
				console.error('❌ Failed to parse cartItems:', err.message);
			}

			const newOrder = new Order({
				guest: true,
				user: null,
				name: session.metadata.name || '',
				email: session.customer_email || '',
				cartItems: cartItems.map((item) => ({
					productId: item.productId,
					name: item.name,
					quantity: item.quantity,
					price: item.price,
					size: item.selectedSize,
				})),
				pickupName: session.metadata.pickupName || '',
				pickupLocation: session.metadata.pickupLocation || 'Farm',
				pickupTime: new Date(session.metadata.pickupTime),
				stripeSessionId: session.id,
			});

			try {
				await newOrder.save();
				console.log('📝 Order saved to MongoDB:', newOrder._id);
				console.log('🔍 Saved stripeSessionId:', newOrder.stripeSessionId);
			} catch (err) {
				console.error('❌ Order save failed:', err.message);
				console.error('Full error:', err);
			}
			// ✅ Now comes the email logic (in a separate try/catch)
			if (session.customer_email) {
				try {
					await sendOrderConfirmationEmail({
						to: session.customer_email,
						subject: 'Your Blueberry Dairy Order Confirmation',
						name: newOrder.name,
						cartItems: newOrder.cartItems,
						pickupName: newOrder.pickupName,
						pickupLocation: newOrder.pickupLocation,
						pickupTime: newOrder.pickupTime.toLocaleString(),
					});
					console.log('📧 Confirmation email sent to customer');
				} catch (err) {
					console.error(
						'❌ Failed to send confirmation email to customer:',
						err.message
					);
				}
			}

			// ✅ Optional: admin email notification
			try {
				await sendOrderConfirmationEmail({
					to: process.env.ADMIN_EMAIL,
					subject: 'New Blueberry Dairy Order',
					name: newOrder.name,
					cartItems: newOrder.cartItems,
					pickupName: newOrder.pickupName,
					pickupLocation: newOrder.pickupLocation,
					pickupTime: newOrder.pickupTime.toLocaleString(),
					isAdminCopy: true,
				});
				console.log('📧 Admin notification sent');
			} catch (err) {
				console.error('❌ Failed to send admin notification:', err.message);
			}
		} else {
			console.log(`ℹ️ Unhandled event type: ${event.type}`);
		}

		res.status(200).json({ received: true });
	}
);

export default router;
