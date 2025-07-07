// @ts-nocheck
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FunnelIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../../api/axios';
import { format } from 'date-fns';
import { useProductContext } from '../../../contexts/ProductContext';
import OrderFiltersModal from '../../../components/products/OrderFiltersModal';

export default function AdminOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showFulfilled, setShowFulfilled] = useState(true);
	const [sortKey, setSortKey] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [filters, setFilters] = useState({
		product: '',
		day: '',
		month: '',
		year: '',
	});

	const { state: productState, fetchProducts } = useProductContext();

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const res = await axiosInstance.get('/orders');
				setOrders(res.data);
			} catch (err) {
				console.log(err);
				setError('Failed to load orders.');
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
		fetchProducts();
	}, [fetchProducts]);

	const toggleFulfilled = async (orderId, currentStatus) => {
		try {
			const res = await axiosInstance.patch(`/orders/${orderId}`, {
				fulfilled: !currentStatus,
			});
			setOrders((prev) =>
				prev.map((o) =>
					o._id === orderId ? { ...o, isFulfilled: res.data.isFulfilled } : o
				)
			);
		} catch (err) {
			console.error('Failed to update status:', err.message);
		}
	};

	const productOptions = productState.products.map((p) => p.name);

	const filteredOrders = orders.filter((order) => {
		const orderDate = new Date(order.pickupTime);
		const matchesProduct = filters.product
			? order.cartItems.some((item) => item.name === filters.product)
			: true;
		const matchesDay = filters.day
			? orderDate.getDate() === parseInt(filters.day)
			: true;
		const matchesMonth = filters.month
			? orderDate.getMonth() + 1 === parseInt(filters.month)
			: true;
		const matchesYear = filters.year
			? orderDate.getFullYear() === parseInt(filters.year)
			: true;
		return matchesProduct && matchesDay && matchesMonth && matchesYear;
	});

	const sortedOrders = [...filteredOrders]
		.filter((order) => showFulfilled || !order.isFulfilled)
		.sort((a, b) => {
			if (!sortKey) return 0;

			let aValue = a[sortKey];
			let bValue = b[sortKey];

			if (sortKey === 'pickupTime') {
				aValue = new Date(aValue);
				bValue = new Date(bValue);
			} else {
				aValue = aValue?.toLowerCase?.() || '';
				bValue = bValue?.toLowerCase?.() || '';
			}

			if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
			if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
			return 0;
		});

	const totalSales = filteredOrders.reduce((acc, order) => {
		return (
			acc +
			order.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
		);
	}, 0);

	if (loading) return <p className='p-6'>Loading orders...</p>;
	if (error) return <p className='p-6 text-red-600'>{error}</p>;

	return (
		<div className='max-w-6xl mx-auto px-4 pt-4 pb-10'>
			<h1 className='text-3xl text-center font-bold mb-10 p-10'>
				Order Summary
			</h1>

			<div className='mb-0 py-2'>
				<OrderFiltersModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					productOptions={productOptions}
					filters={filters}
					setFilters={setFilters}
				/>
			</div>
			<div className='flex justify-between items-center mb-4'>
				<button
					onClick={() => setIsModalOpen(true)}
					className='flex items-center border border-black text-black bg-white text-sm p-2 rounded hover:bg-black hover:text-white transition'
					title='Filter Orders'
					aria-label='Filter Orders'
				>
					<FunnelIcon className='w-4 h-4' />
				</button>

				<div>
					<button
						onClick={() => setShowFulfilled((prev) => !prev)}
						className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition'
					>
						{showFulfilled ? 'Hide Fulfilled Orders' : 'Show Fulfilled Orders'}
					</button>
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
					<thead className='bg-indigo-100'>
						<tr>
							{['pickupName', 'pickupLocation', 'pickupTime'].map((key) => (
								<th
									key={key}
									onClick={() =>
										setSortKey((prevKey) =>
											prevKey === key
												? (setSortOrder((prev) =>
														prev === 'asc' ? 'desc' : 'asc'
												  ),
												  key)
												: (setSortOrder('asc'), key)
										)
									}
									className='cursor-pointer px-4 py-3 text-left hover:text-indigo-700'
								>
									{
										{
											pickupName: 'Pickup Name',
											pickupLocation: 'Location',
											pickupTime: 'Pickup Time',
										}[key]
									}{' '}
									{sortKey === key && (sortOrder === 'asc' ? '↑' : '↓')}
								</th>
							))}

							<th className='text-left px-4 py-3'>Items</th>
							<th className='text-left px-4 py-3'>Total</th>
							<th className='text-left px-4 py-3'>Status</th>
						</tr>
					</thead>

					<tbody>
						{sortedOrders.map((order) => {
							const total = order.cartItems.reduce(
								(sum, item) => sum + item.price * item.quantity,
								0
							);
							return (
								<tr key={order._id} className='border-t border-gray-200'>
									<td className='px-4 py-3'>{order.pickupName}</td>
									<td className='px-4 py-3'>{order.pickupLocation}</td>
									<td className='px-4 py-3'>
										{format(new Date(order.pickupTime), 'PPpp')}
									</td>
									<td className='px-4 py-3 text-sm'>
										<ul className='list-disc pl-4'>
											{order.cartItems.map((item, i) => (
												<li key={i}>
													{item.quantity} × {item.name} ({item.size})
												</li>
											))}
										</ul>
									</td>
									<td className='px-4 py-3 font-medium'>${total.toFixed(2)}</td>
									<td className='px-4 py-3'>
										<button
											onClick={() =>
												toggleFulfilled(order._id, order.isFulfilled)
											}
											className={`px-3 py-1 rounded-full text-sm font-medium ${
												order.isFulfilled
													? 'bg-green-200 text-green-900'
													: 'bg-yellow-100 text-yellow-800'
											}`}
										>
											{order.isFulfilled ? 'Fulfilled' : 'Pending'}
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<p className='mt-4 font-semibold'>
				Total Sales for Filtered Orders: ${totalSales.toFixed(2)}
			</p>
		</div>
	);
}
