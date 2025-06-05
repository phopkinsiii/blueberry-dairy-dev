// @ts-nocheck
// src/pages/admin/ManageInventory.jsx
import { useEffect, useState } from 'react';
import { useProductContext } from '../../../contexts/ProductContext';

const ManageInventory = () => {
	const { state, fetchProducts, updateProductStock } = useProductContext();
	const { products } = state;

	const [amounts, setAmounts] = useState({});

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleInputChange = (id, value) => {
		setAmounts((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleUpdateClick = (id) => {
		const amount = parseInt(amounts[id], 10);
		if (!isNaN(amount) && amount !== 0) {
			updateProductStock(id, amount).then(() => {
				// Clear input after update
				setAmounts((prev) => ({
					...prev,
					[id]: '',
				}));
			});
		}
	};

	if (!products || products.length === 0) {
		return (
			<p className='text-center text-gray-500 mt-10'>No products available.</p>
		);
	}

	return (
		<section className='min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 px-4 py-8'>
			<div className='p-6 max-w-4xl mx-auto'>
				<h2 className='text-2xl font-semibold mb-6'>Manage Inventory</h2>
				{products.map((product) => (
					<div
						key={product._id}
						className='mb-6 p-4 border rounded shadow bg-white dark:bg-gray-800'
					>
						<h3 className='font-bold'>{product.name}</h3>
						<p>
							Current Stock: <span className='font-mono'>{product.stock}</span>
						</p>

						<div className='flex items-center mt-3 space-x-4'>
							<input
								type='number'
								min='0'
								value={amounts[product._id] ?? ''}
								onChange={(e) => handleInputChange(product._id, e.target.value)}
								placeholder='Amount to add'
								className='border p-2 rounded w-40 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-white placeholder:font-semibold placeholder:text-lg'
							/>
							<button
								onClick={() => handleUpdateClick(product._id)}
								disabled={
									!amounts[product._id] ||
									parseInt(amounts[product._id], 10) === 0
								}
								className={`px-4 py-2 rounded font-semibold ${
									!amounts[product._id] ||
									parseInt(amounts[product._id], 10) === 0
										? 'bg-gray-300 text-gray-500 cursor-not-allowed'
										: 'bg-blue-600 text-white hover:bg-blue-700'
								}`}
							>
								Update
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ManageInventory;
