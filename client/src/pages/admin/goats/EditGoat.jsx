// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import GoatForm from '../../../components/goats/GoatForm';
import Spinner from '../../../components/Spinner.jsx';
import { toast } from 'react-toastify';

const EditGoat = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [goat, setGoat] = useState(null);
	const [imageFiles, setImageFiles] = useState([]);
	const [imageUrls, setImageUrls] = useState([]);

	useEffect(() => {
		const fetchGoat = async () => {
			try {
				const { data } = await axiosInstance.get(`/goats/${id}`);
				setGoat(data);
			} catch (err) {
				console.error('❌ Error fetching goat:', err);
			}
		};
		fetchGoat();
	}, [id]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (name in goat.pedigree) {
			setGoat((prev) => ({
				...prev,
				pedigree: { ...prev.pedigree, [name]: value },
			}));
		} else {
			setGoat((prev) => ({
				...prev,
				[name]: type === 'checkbox' ? checked : value,
			}));
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
		setImageFiles((prev) => [...prev, ...files]);
	};

	const handleImageUrlChange = (index, value) => {
		const updated = [...imageUrls];
		updated[index] = value;
		setImageUrls(updated);
	};

	const addImageUrlField = () => {
		setImageUrls((prev) => [...prev, '']);
	};

	const handleRemoveImageUrlField = (index) => {
		setImageUrls((prev) => prev.filter((_, i) => i !== index));
	};

	const removeImage = async (url) => {
		const confirm = window.confirm('Remove this image?');
		if (!confirm) return;

		try {
			await axiosInstance.post(`/goats/${id}/images/remove`, { imageUrl: url });
			toast.success('Image removed');

			const { data } = await axiosInstance.get(`/goats/${id}`);
			setGoat(data);

			setImageUrls((prev) => prev.filter((img) => img !== url));
		} catch (err) {
			console.error('❌ Failed to remove image:', err);
			toast.error('Failed to remove image');
		}
	};

	const updateImageOrder = (newOrder) => {
		setGoat((prev) => ({ ...prev, images: newOrder }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const updatedGoat = {
				...goat,
				images: [
					...goat.images,
					...imageUrls.filter((url) => url.trim() !== ''),
				],
			};

			await axiosInstance.put(`/goats/${id}`, updatedGoat);
			toast.success('Goat updated');
			setImageUrls([]);
			navigate('/manage-goats');
		} catch (err) {
			console.error('❌ Update failed:', err);
			toast.error('Failed to update goat');
		}
	};

	if (!goat) return <Spinner />;

	return (
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
			handleRemoveImageUrlField={handleRemoveImageUrlField}
			removeImage={removeImage}
			updateImageOrder={updateImageOrder}
			onSubmit={handleSubmit}
			isEdit={true}
		/>
	);
};

export default EditGoat;
