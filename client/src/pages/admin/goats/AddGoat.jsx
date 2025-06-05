// @ts-nocheck
// src/pages/admin/AddGoat.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { useUserContext } from '../../../contexts/UserContext';

import { validateGoatForm } from '../../../utils/validators';
import {toast} from 'react-toastify'

const AddGoat = () => {
	const { state } = useUserContext();
	const navigate = useNavigate();

	const [goat, setGoat] = useState({
		nickname: '',
		registeredName: '',
		dob: '',
		gender: '',
		adgaId: '',
		awards: [''],
		pedigree: {
			sire: '',
			dam: '',
			siresSire: '',
			siresDam: '',
			damsSire: '',
			damsDam: '',
		},
		dnaConfirmed: false,
		forSale: false,
		price: '',
		additionalInfo: '',
	});

	const [imageFiles, setImageFiles] = useState([]);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (name in goat.pedigree) {
			setGoat({ ...goat, pedigree: { ...goat.pedigree, [name]: value } });
		} else if (name === 'dnaConfirmed' || name === 'forSale') {
			setGoat({ ...goat, [name]: checked });
		} else {
			setGoat({ ...goat, [name]: value });
		}
	};

	const handleAwardsChange = (index, value) => {
		const updatedAwards = [...goat.awards];
		updatedAwards[index] = value;
		setGoat({ ...goat, awards: updatedAwards });
	};

	const addAward = () => {
		setGoat({ ...goat, awards: [...goat.awards, ''] });
	};

	const handleImageChange = async (e) => {
		const files = Array.from(e.target.files);
		if (!files.length) return;

		try {
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1200,
				useWebWorker: true,
			};

			const compressedFiles = await Promise.all(
				files.map((file) => imageCompression(file, options))
			);

			setImageFiles(compressedFiles);
		} catch (err) {
			console.error('Image compression failed:', err);
			setError('Image compression failed. Try smaller files.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
			const errors = validateGoatForm(goat);
	if (Object.keys(errors).length > 0) {
		Object.values(errors).forEach((msg) => toast.error(msg));
		return;
	}

		try {
			const token = state.user?.token;
			let uploadedImages = [];

			for (const file of imageFiles) {
				const formData = new FormData();
				formData.append('file', file);
				formData.append(
					'upload_preset',
					import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
				);

				const uploadRes = await axios.post(
					import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
					formData
				);
				uploadedImages.push(uploadRes.data.secure_url);
			}

			const goatData = {
				...goat,
				price: goat.forSale ? Number(goat.price) : null,
				images: uploadedImages, // ⬅️ Multiple images
			};

			const res = await axiosInstance.post('/goats', goatData, {
				headers: { Authorization: `Bearer ${token}` },
			});

			alert(`✅ Goat added: ${res.data.newGoat.nickname}`);
			navigate('/our-goats');
		} catch (error) {
			console.error('❌ Failed to add goat:', error);
			setError(error.response?.data?.message || 'Failed to add goat');
		}
	};

	return (
		<div className='max-w-2xl mx-auto p-6 bg-white shadow-md'>
			<h2 className='text-2xl font-bold mb-4 text-gray-800'>Add New Goat</h2>
			{error && <p className='text-red-500 mb-4'>{error}</p>}

			<form onSubmit={handleSubmit} className='space-y-4'>
				<InputField
					label='Nickname'
					name='nickname'
					value={goat.nickname}
					onChange={handleChange}
				/>
				<InputField
					label='Full Registered Name'
					name='registeredName'
					value={goat.registeredName}
					onChange={handleChange}
				/>
				<InputField
					label='Date of Birth'
					name='dob'
					type='date'
					value={goat.dob}
					onChange={handleChange}
				/>
				<InputField
					label='ADGA Registration Number'
					name='adgaId'
					value={goat.adgaId}
					onChange={handleChange}
				/>
				<div className='mb-4'>
					<label
						htmlFor='gender'
						className='block text-sm font-medium text-gray-700'
					>
						Gender <span className='text-red-500'>*</span>
					</label>
					<select
						id='gender'
						name='gender'
						required
						className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2'
						value={goat.gender}
						onChange={(e) => setGoat({ ...goat, gender: e.target.value })}
					>
						<option value=''>Select</option>
						<option value='Doe'>Doe</option>
						<option value='Buck'>Buck</option>
						<option value='Wether'>Wether</option>
					</select>
				</div>

				<div>
					<label className='block font-medium mb-1'>Awards</label>
					{goat.awards.map((award, index) => (
						<input
							key={index}
							type='text'
							value={award}
							onChange={(e) => handleAwardsChange(index, e.target.value)}
							className='w-full mb-2 border px-3 py-2 rounded'
							placeholder='e.g., Best Udder 2024'
						/>
					))}
					<button
						type='button'
						onClick={addAward}
						className='text-blue-600 text-sm hover:underline'
					>
						+ Add Award
					</button>
				</div>

				<fieldset className='border p-4 rounded'>
					<legend className='text-sm font-semibold mb-2'>Pedigree</legend>
					{Object.entries(goat.pedigree).map(([key, value]) => (
						<InputField
							key={key}
							label={key.replace(/([A-Z])/g, ' $1')}
							name={key}
							value={value}
							onChange={handleChange}
						/>
					))}
				</fieldset>

				<div className='flex items-center gap-2'>
					<input
						type='checkbox'
						name='dnaConfirmed'
						checked={goat.dnaConfirmed}
						onChange={handleChange}
					/>
					<label htmlFor='dnaConfirmed' className='text-sm'>
						DNA Parentage Confirmed
					</label>
				</div>

				<div className='flex items-center gap-2'>
					<input
						type='checkbox'
						name='forSale'
						checked={goat.forSale}
						onChange={handleChange}
					/>
					<label htmlFor='forSale' className='text-sm'>
						Available for Sale
					</label>
				</div>

				{goat.forSale && (
					<>
						<InputField
							label='Price'
							name='price'
							type='number'
							value={goat.price}
							onChange={handleChange}
						/>
						<label className='block font-medium mb-1'>Additional Info</label>
						<textarea
							name='additionalInfo'
							value={goat.additionalInfo}
							onChange={handleChange}
							rows={4}
							className='w-full border px-3 py-2 rounded'
						/>
					</>
				)}

				<div>
					<label className='block font-medium mb-1'>Goat Image</label>
					<input
						type='file'
						accept='image/*'
						multiple
						onChange={handleImageChange}
					/>
				</div>

				<button
					type='submit'
					className='w-full bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800'
				>
					Add Goat
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
			required={type !== 'checkbox'}
		/>
	</div>
);

export default AddGoat;
