// @ts-nocheck
// server/controllers/orderController.js

import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { sendOrderConfirmationEmail } from '../utils/email/sendOrderEmail.js';

export const createOrder = asyncHandler(async (req, res) => {
	const {
		userId,
		guest,
		name,
		email,
		cartItems,
		pickupName,
		pickupLocation,
		pickupTime,
	} = req.body;

	if (!cartItems || cartItems.length === 0) {
		res.status(400);
		throw new Error('Cart is empty');
	}

	// Create and save order in MongoDB
	const order = new Order({
		user: guest ? null : userId,
		name,
		email,
		cartItems,
		pickupName,
		pickupLocation,
		pickupTime,
		guest,
	});

	const createdOrder = await order.save();

	// Send confirmation to the customer
	const customerEmailResult = await sendOrderConfirmationEmail({
		to: createdOrder.email,
		subject: 'Your Order Confirmation',
		name: createdOrder.name,
		cartItems: createdOrder.cartItems,
		pickupName: createdOrder.pickupName,
		pickupLocation: createdOrder.pickupLocation,
		pickupTime: createdOrder.pickupTime,
	});

	// Send copy to the farm owner/admin
	const adminEmailResult = await sendOrderConfirmationEmail({
		to: 'phopkins1757@gmail.com', // ✅ Update to your desired email
		subject: `New Order from ${createdOrder.name}`,
		name: createdOrder.name,
		cartItems: createdOrder.cartItems,
		pickupName: createdOrder.pickupName,
		pickupLocation: createdOrder.pickupLocation,
		pickupTime: createdOrder.pickupTime,
		isAdminCopy: true,
	});

	res.status(201).json({
		message: 'Order placed successfully',
		order: createdOrder,
		customerEmailResult,
		adminEmailResult,
	});
});

export const getOrderBySessionId = async (req, res) => {
	try {
		console.log('✅ Order retrieval endpoint hit');
		console.log('🔍 Request headers:', req.headers);

		const { sessionId } = req.params;
		console.log('🔍 Searching for order with sessionId:', sessionId);
		console.log('🔍 Session ID type:', typeof sessionId);

		const order = await Order.findOne({ stripeSessionId: sessionId });
		console.log('🔍 MongoDB query result:', order ? 'found' : 'not found');
		console.log('🔍 Found order:', order ? 'yes' : 'no');

		if (!order) {
			console.log('❌ Order not found for sessionId:', sessionId);
			return res.status(404).json({ message: 'Order not found' });
		}
		console.log('✅ Found order:', order._id);
		res.json(order);
	} catch (error) {
		console.error('❌ Error in getOrderBySessionId:', error.message);
		res.status(500).json({ message: 'Server error' });
	}
};

// Get all orders (admin view)
export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find().sort({ createdAt: -1 });
		res.json(orders);
	} catch (error) {
		console.error('❌ Error fetching orders:', error.message);
		res.status(500).json({ message: 'Server error' });
	}
};

// Update fulfillment status and adjust inventory
export const updateOrderStatus = asyncHandler(async (req, res) => {
	const { fulfilled } = req.body;
	const order = await Order.findById(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error('Order not found');
	}

	order.isFulfilled = fulfilled;

	if (fulfilled && !order.inventoryAdjusted) {
		for (const item of order.cartItems) {
			const product = await Product.findById(item.productId);
			if (product) {
				product.stock = Math.max(product.stock - item.quantity, 0);
				await product.save();
			}
		}
		order.inventoryAdjusted = true;
	}

	await order.save();
	res.json(order);
});
