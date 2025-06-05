// @ts-nocheck
import React, { useEffect } from 'react';
import { useProductContext } from '../../../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
	const { state, fetchProducts, deleteProduct } = useProductContext();
	const { products, loading, error } = state;
	const navigate = useNavigate();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const handleEdit = (productId) => {
		navigate(`/admin/edit-product/${productId}`);
	};

	const handleDelete = (productId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this product?'
		);
		if (confirmDelete) {
			const user = JSON.parse(localStorage.getItem('user'));
			const token = user?.token;
			deleteProduct(productId, token);
		}
	};

	return (
		<div className='max-w-6xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-6 text-gray-800'>Manage Products</h1>
			{loading && <p className='text-blue-500'>Loading products...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{products.map((product) => (
					<div
						key={product._id}
						className='bg-white shadow-md rounded-lg p-4 flex flex-col justify-between'
					>
						<img
							src={`${import.meta.env.VITE_MEDIA_BASE_URL}${product.imageSrc}`} // or post.image
							alt={product.imageAlt || 'Product Image'}
							crossOrigin='anonymous'
							className='w-full h-40 object-cover rounded mb-4'
						/>
						<h3 className='text-xl font-semibold text-gray-900'>
							{product.name}
						</h3>
						<p className='text-gray-600 mb-2'>${product.price}</p>
						<div className='flex justify-between mt-4'>
							<button
								onClick={() => handleEdit(product._id)}
								className='bg-indigo-800 hover:bg-yellow-600 text-white px-4 py-1 rounded'
							>
								Edit
							</button>
							<button
								onClick={() => handleDelete(product._id)}
								className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded'
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ManageProducts;
