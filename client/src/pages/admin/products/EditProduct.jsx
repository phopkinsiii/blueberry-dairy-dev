import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../../../contexts/ProductContext.jsx';
import axiosInstance from '../../../api/axios.js';

const EditProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { state: productState, fetchProducts } = useProductContext();

	const [form, setForm] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		imageSrc: '',
		imageAlt: '',
	});

	useEffect(() => {
		if (!productState.products.length) {
			fetchProducts(); // fetch products if not already loaded
		}
	}, [fetchProducts, productState.products.length]);

	useEffect(() => {
		const product = productState.products.find((p) => p._id === id);
		if (product) {
			setForm(product);
		}
	}, [id, productState.products]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = JSON.parse(localStorage.getItem('user'));
			const token = user?.token;

			await axiosInstance.put(`/products/${id}`, form, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			alert('Product updated!');
			navigate('/manage-products');
		} catch (error) {
			console.error('Failed to update product:', error);
			alert('Error updating product');
		}
	};

	return (
		<div className='max-w-3xl mx-auto p-6 bg-white shadow rounded-lg'>
			<h2 className='text-2xl font-bold mb-4'>Edit Product</h2>
			<form onSubmit={handleSubmit} className='space-y-4'>
				{[
					'name',
					'description',
					'price',
					'category',
					'imageSrc',
					'imageAlt',
				].map((field) => (
					<div key={field}>
						<label className='block font-medium text-gray-700 capitalize'>
							{field}
						</label>
						<input
							type={field === 'price' ? 'number' : 'text'}
							name={field}
							value={form[field] || ''}
							onChange={handleChange}
							className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md'
						/>
					</div>
				))}
				<button
					type='submit'
					className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'
				>
					Save Changes
				</button>
			</form>
		</div>
	);
};

export default EditProduct;
