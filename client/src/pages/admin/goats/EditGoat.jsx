// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import Spinner from '../../../components/Spinner';
import GoatForm from '../../../components/goats/GoatForm';
import { toast } from 'react-toastify';

const EditGoat = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [goat, setGoat] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [imageFiles, setImageFiles] = useState([]);
	const [imageUrls, setImageUrls] = useState([]);

	useEffect(() => {
		const fetchGoat = async () => {
			try {
				const res = await axiosInstance.get(`/goats/${id}`);
				setGoat(res.data);
			} catch (err) {
				console.error(err);
				setError('Failed to load goat data');
			} finally {
				setLoading(false);
			}
		};
		fetchGoat();
	}, [id]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (
			['sire', 'dam', 'siresSire', 'siresDam', 'damsSire', 'damsDam'].includes(
				name
			)
		) {
			setGoat((prev) => ({
				...prev,
				pedigree: {
					...prev.pedigree,
					[name]: value,
				},
			}));
		} else if (type === 'checkbox') {
			setGoat((prev) => ({ ...prev, [name]: checked }));
		} else {
			setGoat((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleAwardsChange = (index, value) => {
		const updated = [...goat.awards];
		updated[index] = value;
		setGoat((prev) => ({ ...prev, awards: updated }));
	};

	const addAward = () => {
		setGoat((prev) => ({ ...prev, awards: [...prev.awards, ''] }));
	};

	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files);
		setImageFiles(files);
	};

	const handleImageUrlChange = (index, value) => {
		const updated = [...imageUrls];
		updated[index] = value;
		setImageUrls(updated);
	};

	const addImageUrlField = () => {
		setImageUrls((prev) => [...prev, '']);
	};

	const removeImage = (index) => {
		if (goat.images.length === 1) {
			const confirmDelete = window.confirm(
				'This is the last image. Are you sure you want to remove it?'
			);
			if (!confirmDelete) return;
		}

		const updated = [...goat.images];
		updated.splice(index, 1);
		setGoat((prev) => ({ ...prev, images: updated }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		imageFiles.forEach((file) => formData.append('images', file));

		// Append image URLs
		imageUrls.forEach((url) => {
			if (url.trim().startsWith('http')) {
				formData.append('imageUrls', url.trim());
			}
		});

		try {
			const updatedGoat = {
				...goat,
				images: goat.images, // reordered list
			};

			await axiosInstance.put(`/goats/${id}`, updatedGoat);
			toast.success('Goat updated successfully');
			navigate('/manage-goats');
		} catch (err) {
			console.error(err);
			toast.error('Failed to update goat');
		}
	};

	if (loading) return <Spinner />;
	if (error) return <div className='p-6 text-red-600'>{error}</div>;
	if (!goat) return null;

	return (
		<div className='p-6 max-w-4xl mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Edit Goat</h1>
			<GoatForm
				goat={goat}
				handleChange={handleChange}
				handleAwardsChange={handleAwardsChange}
				addAward={addAward}
				handleImageUpload={handleImageUpload}
				imageFiles={imageFiles}
				imageUrls={imageUrls}
				handleImageUrlChange={handleImageUrlChange}
				addImageUrlField={addImageUrlField}
				removeImage={removeImage}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default EditGoat;
