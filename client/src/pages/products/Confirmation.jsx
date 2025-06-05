// @ts-nocheck
// src/pages/Confirmation.jsx

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext.jsx';
import axiosInstance from '../../api/axios.js';
import SeoHead from '../../components/SeoHead.jsx';

export default function Confirmation() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const sessionId = searchParams.get('session_id');
	const { dispatch } = useCartContext();
	const [order, setOrder] = useState(null);

	useEffect(() => {
		if (!sessionId) {
			navigate('/');
			return;
		}
		const fetchOrder = async () => {
			try {
				const { data } = await axiosInstance.get(
					`/orders/session/${sessionId}`
				);
				setOrder(data);
				dispatch({ type: 'CLEAR_CART' });
			} catch (error) {
				console.error('❌ Failed to fetch order:', error);
			}
		};
		fetchOrder();
	}, [navigate, sessionId, dispatch]);

	if (!order) return null;

	const { pickupName, pickupLocation, pickupTime } = order || {};

	const formattedTime = pickupTime
		? new Date(pickupTime).toLocaleString(undefined, {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
		  })
		: 'Not specified';

	return (
		<>
			{/* SEO Metadata */}
			{pickupName && pickupLocation && pickupTime && (
				<SeoHead
					title={`Order Confirmed for ${pickupName} | Blueberry Dairy`}
					description={`Thank you, ${pickupName}, for your order from Blueberry Dairy. Pickup is scheduled for ${pickupTime} at ${pickupLocation}.`}
					image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
					url='https://www.blueberrydairy.com/confirmation'
				/>
			)}

			<div className='max-w-2xl mx-auto px-6 py-16 text-center text-gray-800'>
				<h1 className='text-3xl font-bold mb-6'>Thank You for Your Order!</h1>

				<p className='text-lg mb-4'>
					<strong>Pickup Name:</strong> {pickupName || 'N/A'}
				</p>

				<p className='text-lg mb-4'>
					<strong>Pickup Location:</strong> {pickupLocation || 'N/A'}
				</p>

				<p className='text-lg mb-6'>
					<strong>Pickup Time:</strong> {formattedTime}
				</p>

				<p className='text-md text-green-700 font-semibold'>
					✅ Your order was placed successfully. Check your email for
					confirmation.
				</p>
			</div>
		</>
	);
}
