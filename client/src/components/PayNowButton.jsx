// src/components/PayNowButton.jsx
// @ts-nocheck
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import axiosInstance from '../api/axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const formatPrice = (price) => `$${price.toFixed(2)}`;

const PayNowButton = ({ form, cartItems }) => {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		if (!form || !cartItems?.length) return;

		try {
			setLoading(true);
			const stripe = await stripePromise;

			console.log('🧾 Cart items being sent to backend:', cartItems);
			console.log('📬 Form data:', form);

			const response = await axiosInstance.post('/checkout/create-session', {
				form,
				cartItems,
			});

			const sessionId = response.data?.id;
			if (!stripe || !sessionId) throw new Error('Stripe setup failed');

			const { error } = await stripe.redirectToCheckout({ sessionId });
			if (error) console.error('Stripe redirect error:', error.message);
		} catch (err) {
			console.error('Error starting checkout:', err);
		} finally {
			setLoading(false);
		}
	};

	const totalPrice = cartItems.reduce(
		(sum, item) =>
			sum + (item.selectedOption?.price || item.price || 0) * (item.quantity || 1),
		0
	);

	return (
		<button
			onClick={handleClick}
			disabled={loading}
			className={`mt-4 w-full bg-indigo-600 text-white px-4 py-3 text-lg rounded hover:bg-indigo-700 transition ${
				loading ? 'opacity-50 cursor-not-allowed' : ''
			}`}
		>
			{loading ? 'Processing...' : `Pay Now (${formatPrice(totalPrice)})`}
		</button>
	);
};

export default PayNowButton;
