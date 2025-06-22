// @ts-nocheck
// controllers/webhookController.js
import Stripe from 'stripe';
import Order from '../models/orderModel.js';
import { sendOrderConfirmationEmail } from '../utils/sendEmail.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
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

	if (event.type === 'checkout.session.completed') {
		const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
  expand: ['line_items'],
});

		console.log('✅ Payment succeeded:', session.id);

		const metadata = session.metadata || {};
		let cartItems = [];

		try {
			console.log('🛍️ Raw metadata.cart:', metadata.cart);
			cartItems = JSON.parse(metadata.cart || '[]');
			console.log('🧾 Parsed cartItems:', cartItems);
		} catch (err) {
			console.error('❌ Failed to parse cartItems:', err.message);
		}

		// Log and validate pickupTime
		console.log('📅 Raw pickupTime metadata:', metadata.pickupTime);
		const parsedPickupTime = new Date(metadata.pickupTime);
		const validPickupTime = isNaN(parsedPickupTime.getTime())
			? null
			: parsedPickupTime;

		if (!validPickupTime) {
			console.warn('⚠️ Invalid or missing pickupTime:', metadata.pickupTime);
		}

		const newOrder = new Order({
			guest: true,
			user: null,
			name: metadata.name || '',
			email: session.customer_email || '',
			cartItems: cartItems.map((item) => ({
				productId: item.productId,
				name: item.name,
				quantity: item.quantity,
				price: item.price,
				size: item.selectedSize,
			})),
			pickupName: metadata.pickupName || '',
			pickupLocation: metadata.pickupLocation || 'Farm',
			pickupTime: validPickupTime,
			stripeSessionId: session.id,
		});

		try {
			await newOrder.save();
			console.log('📝 Order saved to MongoDB:', newOrder._id);
		} catch (err) {
			console.error('❌ Order save failed:', err.message);
			console.error('Full error:', err);
		}

		// Send confirmation email to customer
		if (session.customer_email) {
			try {
				await sendOrderConfirmationEmail({
					to: session.customer_email,
					subject: 'Your Blueberry Dairy Order Confirmation',
					name: newOrder.name,
					cartItems: newOrder.cartItems,
					pickupName: newOrder.pickupName,
					pickupLocation: newOrder.pickupLocation,
					pickupTime: validPickupTime
						? validPickupTime.toLocaleString()
						: 'Unavailable',
				});
				console.log('📧 Confirmation email sent to customer');
			} catch (err) {
				console.error('❌ Failed to send customer confirmation email:', err.message);
			}
		}

		// Optional: Send admin notification
		try {
			await sendOrderConfirmationEmail({
				to: process.env.ADMIN_EMAIL,
				subject: 'New Blueberry Dairy Order',
				name: newOrder.name,
				cartItems: newOrder.cartItems,
				pickupName: newOrder.pickupName,
				pickupLocation: newOrder.pickupLocation,
				pickupTime: validPickupTime
					? validPickupTime.toLocaleString()
					: 'Unavailable',
				isAdminCopy: true,
			});
			console.log('📧 Admin notification sent');
		} catch (err) {
			console.error('❌ Failed to send admin email:', err.message);
		}
	} else {
		console.log(`ℹ️ Unhandled event type: ${event.type}`);
	}

	res.status(200).json({ received: true });
};
