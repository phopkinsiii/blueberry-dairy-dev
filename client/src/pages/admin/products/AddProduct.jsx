// @ts-nocheck
// src/pages/admin/AddProduct.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

import { useUserContext } from '../../../contexts/UserContext';

const AddProduct = () => {
	const { state } = useUserContext();
	const navigate = useNavigate();

	const [product, setProduct] = useState({
		name: '',
		description: '',
		category: 'blueberries',
		imageAlt: '',
		stock: 0,
		priceOptions: [{ size: '', price: '' }],
	});

	const [imageFile, setImageFile] = useState(null);
	const [error, setError] = useState(null);

	const [imageUrl, setImageUrl] = useState('');

	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	const handlePriceOptionChange = (index, field, value) => {
		const updatedOptions = [...product.priceOptions];
		updatedOptions[index][field] = value;
		setProduct({ ...product, priceOptions: updatedOptions });
	};

	const addPriceOption = () => {
		setProduct({
			...product,
			priceOptions: [...product.priceOptions, { size: '', price: '' }],
		});
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			const options = {
				maxSizeMB: 1, // Max size (MB)
				maxWidthOrHeight: 1800, // Resize if needed
				useWebWorker: true,
			};
			const compressedFile = await imageCompression(file, options);
			setImageFile(compressedFile);
		} catch (err) {
			console.error('Image compression failed:', err);
			setError('Image compression failed. Try a smaller file.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			const token = state.user?.token;

			let imageSrc = '';
			if (imageFile) {
				const formData = new FormData();
				formData.append('file', imageFile);
				formData.append(
					'upload_preset',
					import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
				);
				const uploadRes = await axios.post(
					import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
					formData
				);
				console.log('🖼️ Uploaded to Cloudinary:', uploadRes.data);
				imageSrc = uploadRes.data.secure_url;
			} else if (imageUrl) {
				imageSrc = imageUrl.trim();
			}

			const productData = {
				...product,
				imageSrc,
				priceOptions: product.priceOptions.map((opt) => ({
					size: opt.size,
					price: Number(opt.price),
				})),
			};

			const res = await axiosInstance.post('/products', productData, {
				headers: { Authorization: `Bearer ${token}` },
			});

			alert(`✅ Product created: ${res.data.newProduct.name}`);
			navigate('/manage-products');
		} catch (error) {
			console.error('❌ Product creation error:', error);
			setError(error.response?.data?.message || 'Failed to add product');
		}
	};

	return (
		<div className='max-w-xl mx-auto p-6 bg-white shadow-md'>
			<h2 className='text-2xl font-bold text-gray-800 mb-4'>Add New Product</h2>
			{error && <p className='text-red-500 mb-4'>{error}</p>}

			<form onSubmit={handleSubmit} className='space-y-4'>
				<InputField
					label='Product Name'
					name='name'
					value={product.name}
					onChange={handleChange}
				/>
				<InputField
					label='Description'
					name='description'
					value={product.description}
					onChange={handleChange}
				/>
				<InputField
					label='Alt Text'
					name='imageAlt'
					value={product.imageAlt}
					onChange={handleChange}
				/>
				<InputField
					label='Stock Quantity'
					name='stock'
					type='number'
					value={product.stock}
					onChange={handleChange}
				/>

				<div>
					<label className='block mb-1 font-medium'>Category</label>
					<select
						name='category'
						value={product.category}
						onChange={handleChange}
						className='w-full border px-3 py-2 rounded'
					>
						<option value='blueberries'>Blueberries</option>
						<option value='apples'>Apples</option>
						<option value='dairy'>Dairy</option>
						<option value='goats'>Goats</option>
					</select>
				</div>

				<div>
					<label className='block mb-1 font-medium'>Product Image</label>
					<input type='file' accept='image/*' onChange={handleImageChange} />
				</div>
				<InputField
					label='Or Enter Image URL'
					name='imageUrl'
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
				/>

				<div>
					<label className='block mb-2 font-medium'>Price Options</label>
					{product.priceOptions.map((opt, index) => (
						<div key={index} className='flex gap-2 mb-2'>
							<select
								value={opt.size}
								onChange={(e) =>
									handlePriceOptionChange(index, 'size', e.target.value)
								}
								className='border px-2 py-1 rounded w-1/2'
							>
								<option value=''>Select Size</option>
								<option value='pint'>Pint</option>
								<option value='quart'>Quart</option>
								<option value='half-gallon'>Half Gallon</option>
								<option value='gallon'>Gallon</option>
								<option value='package'>Package</option>
								<option value='each'>Each</option>
								<option value='lb'>Pound (lb)</option>
							</select>
							<input
								type='number'
								placeholder='Price'
								value={opt.price}
								onChange={(e) =>
									handlePriceOptionChange(index, 'price', e.target.value)
								}
								className='border px-2 py-1 rounded w-1/2'
							/>
						</div>
					))}
					<button
						type='button'
						onClick={addPriceOption}
						className='text-sm text-blue-600 hover:underline'
					>
						+ Add another price option
					</button>
				</div>

				<button
					type='submit'
					className='w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'
				>
					Add Product
				</button>
			</form>
		</div>
	);
};

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
	<div>
		<label htmlFor={name} className='block font-medium mb-1'>
			{label}
		</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className='w-full border px-3 py-2 rounded'
			required
		/>
	</div>
);

export default AddProduct;
