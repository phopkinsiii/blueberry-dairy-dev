import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../../../contexts/ProductContext.jsx';
import axiosInstance from '../../../api/axios.js';

const PRODUCT_FIELDS = [
	'name',
	'description',
	'category',
	'imageSrc',
	'imageAlt',
];

const EditProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { state: productState, fetchProducts } = useProductContext();

	const [form, setForm] = useState({
		name: '',
		description: '',
		category: '',
		imageSrc: '',
		imageAlt: '',
		priceOptions: [],
	});

	useEffect(() => {
		if (!productState.products.length) {
			fetchProducts();
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
				{/* Generic fields */}
				{PRODUCT_FIELDS.map((field) => (
					<div key={field}>
						<label className='block font-medium text-gray-700 capitalize'>
							{field}
						</label>
						<input
							type='text'
							name={field}
							value={form[field] || ''}
							onChange={handleChange}
							className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md'
						/>
					</div>
				))}

				{/* Price Options */}
				<div>
					<label className='block font-medium text-gray-700 mb-1'>
						Price Options
					</label>
					{form.priceOptions.map((option, index) => (
						<div key={index} className='flex items-center gap-2 mb-2'>
							<input
								type='text'
								placeholder='Size (e.g., Gallon)'
								value={option.size}
								onChange={(e) => {
									const updated = [...form.priceOptions];
									updated[index].size = e.target.value;
									setForm({ ...form, priceOptions: updated });
								}}
								className='w-1/2 px-3 py-2 border rounded'
							/>
							<input
								type='number'
								step='0.01'
								placeholder='Price'
								value={option.price}
								onChange={(e) => {
									const updated = [...form.priceOptions];
									updated[index].price = parseFloat(e.target.value);
									setForm({ ...form, priceOptions: updated });
								}}
								className='w-1/2 px-3 py-2 border rounded'
							/>
							<button
								type='button'
								onClick={() => {
									const updated = form.priceOptions.filter((_, i) => i !== index);
									setForm({ ...form, priceOptions: updated });
								}}
								className='text-red-500 text-sm hover:underline'
							>
								Remove
							</button>
						</div>
					))}
					<button
						type='button'
						onClick={() =>
							setForm({
								...form,
								priceOptions: [...form.priceOptions, { size: '', price: 0 }],
							})
						}
						className='mt-2 text-blue-600 hover:underline text-sm'
					>
						+ Add Price Option
					</button>
				</div>

				{/* Submit */}
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
