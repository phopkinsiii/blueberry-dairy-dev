// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { useUserContext } from '../../../contexts/UserContext';
import GoatForm from '../../../components/goats/GoatForm';
import { toast } from 'react-toastify';
import { toInputDateFormat } from '../../../utils/dateHelpers';

const EditGoat = () => {
	const { id } = useParams();
	const { state } = useUserContext();
	const navigate = useNavigate();
	const [goat, setGoat] = useState(null);
	const [imageFiles, setImageFiles] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchGoat = async () => {
			try {
				const res = await axiosInstance.get(`/goats/${id}`);
				const fetchedGoat = res.data;

				if (fetchedGoat.dob) {
					fetchedGoat.dob = toInputDateFormat(fetchedGoat.dob);
				}

				setGoat(fetchedGoat);
				console.log('🐐 Loaded goat:', fetchedGoat);
			} catch (err) {
				console.error(err);
				setError('Failed to load goat data');
			}
		};
		fetchGoat();
	}, [id]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (name in goat.pedigree) {
			setGoat({ ...goat, pedigree: { ...goat.pedigree, [name]: value } });
		} else if (type === 'checkbox') {
			setGoat({ ...goat, [name]: checked });
		} else {
			setGoat({ ...goat, [name]: value });
		}
	};

	const handleAwardsChange = (index, value) => {
		const updated = [...goat.awards];
		updated[index] = value;
		setGoat({ ...goat, awards: updated });
	};

	const addAward = () => {
		setGoat({ ...goat, awards: [...goat.awards, ''] });
	};

	const removeImage = (index) => {
		setGoat({ ...goat, images: goat.images.filter((_, i) => i !== index) });
	};

	const handleImageUpload = async (e) => {
		const files = Array.from(e.target.files);
		if (!files.length) return;
		try {
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1200,
				useWebWorker: true,
			};
			const compressed = await Promise.all(
				files.map((f) => imageCompression(f, options))
			);
			setImageFiles(compressed);
		} catch (err) {
			console.error(err);
			setError('Image compression failed.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = state.user?.token;
			let newImageUrls = [];
			if (imageFiles.length > 0) {
				const uploads = await Promise.all(
					imageFiles.map((file) => {
						const formData = new FormData();
						formData.append('file', file);
						formData.append(
							'upload_preset',
							import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
						);
						return axios.post(
							import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
							formData
						);
					})
				);
				newImageUrls = uploads.map((r) => r.data.secure_url);
			}
			const updatedGoat = {
				...goat,
				price: goat.forSale ? Number(goat.price) : null,
				images: [...(goat.images || []), ...newImageUrls],
			};
			await axiosInstance.put(`/goats/${id}`, updatedGoat, {
				headers: { Authorization: `Bearer ${token}` },
			});
			toast.success(`${goat.nickname} updated successfully!`);
			navigate('/goats');
		} catch (err) {
			console.error(err);
			toast.error('Update failed');
		}
	};

	return (
		<div className='max-w-2xl mx-auto p-6 bg-white shadow-md'>
			<h2 className='text-2xl font-bold mb-4 text-gray-800'>Edit Goat</h2>
			{error && <p className='text-red-500 mb-4'>{error}</p>}
			<GoatForm
				goat={goat}
				handleChange={handleChange}
				handleAwardsChange={handleAwardsChange}
				addAward={addAward}
				handleImageUpload={handleImageUpload}
				removeImage={removeImage}
				onSubmit={handleSubmit}
				isEdit
			/>
		</div>
	);
};

export default EditGoat;
