// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { useUserContext } from '../../../contexts/UserContext';
import GoatForm from '../../../components/goats/GoatForm';
import { validateGoatForm } from '../../../utils/validators';
import { toast } from 'react-toastify';

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
		disbudded: true,
		forSale: false,
		price: '',
		additionalInfo: '',
	});

	const [imageFiles, setImageFiles] = useState([]);
	const [imageUrls, setImageUrls] = useState(['']); // 🆕 Allow multiple URLs
	const [error, setError] = useState(null);

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

	const handleImageUrlChange = (index, value) => {
		const updated = [...imageUrls];
		updated[index] = value;
		setImageUrls(updated);
	};

	const addImageUrlField = () => {
		setImageUrls([...imageUrls, '']);
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

			// Upload all image files to Cloudinary
			const uploaded = await Promise.all(
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

			const uploadedUrls = uploaded.map((res) => res.data.secure_url);
			const validManualUrls = imageUrls
				.map((url) => url.trim())
				.filter(Boolean);
			const allImageUrls = [...uploadedUrls, ...validManualUrls];

			const goatData = {
				...goat,
				price: goat.forSale ? Number(goat.price) : null,
				images: allImageUrls,
			};

			const res = await axiosInstance.post('/goats', goatData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			alert(`✅ Goat added: ${res.data.newGoat.nickname}`);
			navigate('/goats');
		} catch (error) {
			console.error(error);
			setError(error.response?.data?.message || 'Failed to add goat');
		}
	};

	return (
		<div className='max-w-2xl mx-auto p-6 bg-white shadow-md'>
			<h2 className='text-2xl font-bold mb-4 text-gray-800'>Add New Goat</h2>
			{error && <p className='text-red-500 mb-4'>{error}</p>}
			<GoatForm
				goat={goat}
				handleChange={handleChange}
				handleAwardsChange={handleAwardsChange}
				addAward={addAward}
				handleImageUpload={handleImageUpload}
				imageUrls={imageUrls}
				handleImageUrlChange={handleImageUrlChange}
				addImageUrlField={addImageUrlField}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default AddGoat;
