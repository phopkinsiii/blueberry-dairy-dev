// src/pages/admin/ManageInventory.jsx
import { useEffect, useState } from 'react';
import { useProductContext } from '../../../contexts/ProductContext';
import Spinner from '../../../components/Spinner.jsx';

const ManageInventory = () => {
	const { state, fetchProducts, updateProductStock } = useProductContext();
	const { products, loading, error } = state;

	const [amounts, setAmounts] = useState({});
	const [newCounts, setNewCounts] = useState({});
	const [previousStocks, setPreviousStocks] = useState({});

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const handleAmountChange = (id, value) => {
		setAmounts((prev) => ({ ...prev, [id]: value }));
	};

	const handleNewCountChange = (id, value) => {
		setNewCounts((prev) => ({ ...prev, [id]: value }));
	};

	const handleUpdateClick = (id) => {
		const amountToAdd = parseInt(amounts[id], 10);
		const newStock = parseInt(newCounts[id], 10);
		const product = products.find((p) => p._id === id);
		const currentStock = product?.stock ?? 0;

		// Prioritize setting new stock
		if (!isNaN(newStock)) {
			setPreviousStocks((prev) => ({ ...prev, [id]: currentStock }));
			updateProductStock(id, { newStock }).then(() => {
				setNewCounts((prev) => ({ ...prev, [id]: '' }));
			});
		} else if (!isNaN(amountToAdd) && amountToAdd !== 0) {
			setPreviousStocks((prev) => ({ ...prev, [id]: currentStock }));
			updateProductStock(id, { amountToAdd }).then(() => {
				setAmounts((prev) => ({ ...prev, [id]: '' }));
			});
		}
	};

	const handleUndoClick = (id) => {
		const previousStock = previousStocks[id];
		if (previousStock !== undefined) {
			updateProductStock(id, { newStock: previousStock }).then(() => {
				setPreviousStocks((prev) => {
					const updated = { ...prev };
					delete updated[id];
					return updated;
				});
			});
		}
	};

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <p className='text-center text-red-500 mt-10'>Error: {error}</p>;
	}

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
							Current Stock:{' '}
							<span className='font-mono text-lg'>{product.stock}</span>
						</p>

						<div className='mt-4 space-y-3 md:space-y-0 md:flex md:items-end md:space-x-4'>
							<div className='flex flex-col'>
								<label htmlFor={`add-${product._id}`} className='font-medium'>
									Amount to add
								</label>
								<input
									id={`add-${product._id}`}
									type='number'
									min='0'
									value={amounts[product._id] ?? ''}
									onChange={(e) =>
										handleAmountChange(product._id, e.target.value)
									}
									placeholder='e.g. 5'
									className='border p-2 rounded w-40 bg-white dark:bg-gray-700 text-black dark:text-white'
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor={`set-${product._id}`} className='font-medium'>
									Set new stock
								</label>
								<input
									id={`set-${product._id}`}
									type='number'
									min='0'
									value={newCounts[product._id] ?? ''}
									onChange={(e) =>
										handleNewCountChange(product._id, e.target.value)
									}
									placeholder='e.g. 20'
									className='border p-2 rounded w-40 bg-white dark:bg-gray-700 text-black dark:text-white'
								/>
							</div>

							<div>
								<button
									onClick={() => handleUpdateClick(product._id)}
									disabled={
										(!amounts[product._id] ||
											parseInt(amounts[product._id], 10) === 0) &&
										!newCounts[product._id]
									}
									className={`mt-2 md:mt-0 px-4 py-2 rounded font-semibold ${
										(!amounts[product._id] ||
											parseInt(amounts[product._id], 10) === 0) &&
										!newCounts[product._id]
											? 'bg-gray-300 text-gray-500 cursor-not-allowed'
											: 'bg-blue-600 text-white hover:bg-blue-700'
									}`}
								>
									Update
								</button>
								{previousStocks[product._id] !== undefined && (
									<button
										onClick={() => handleUndoClick(product._id)}
										className='ml-4 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600'
									>
										Undo
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ManageInventory;
