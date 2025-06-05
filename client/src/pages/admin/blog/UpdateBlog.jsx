// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';
import { useBlogContext } from '../../../contexts/BlogContext';
import BlogEditor from './BlogEditor';
import axios from 'axios';
import axiosInstance from '../../../api/axios';
import { toast } from 'react-toastify';

const UpdateBlog = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { state: userState } = useUserContext();
	const { fetchPostById, state: blogState } = useBlogContext();
	const post = blogState.singlePost;

	const [formData, setFormData] = useState({
		title: '',
		content: '',
		tags: [],
		image: '',
		published: true,
	});

	const [initialData, setInitialData] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [isChanged, setIsChanged] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (id) fetchPostById(id);
	}, [id, fetchPostById]);

	useEffect(() => {
		if (post) {
			// if (
			// 	post.author._id !== userState.user?._id &&
			// 	userState.user?.role !== 'admin'
			// ) {
			// 	toast.error('Access denied: Only the author can edit this post.');
			// 	navigate('/manage-posts');
			// 	return;
			// }

			const { title, content, tags, image, published } = post;
			const initial = {
				title: title || '',
				content: content || '',
				tags: tags || [],
				image: image || '',
				published: typeof published === 'boolean' ? published : true,
			};

			setFormData(initial);
			setInitialData(initial);
		}
	}, [post, userState.user, navigate]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === 'checkbox' ? checked : value;
		const updatedForm = { ...formData, [name]: newValue };
		setFormData(updatedForm);
		setIsChanged(JSON.stringify(updatedForm) !== JSON.stringify(initialData));
	};

	const handleTags = (e) => {
		const tags = e.target.value.split(',').map((tag) => tag.trim());
		const updatedForm = { ...formData, tags };
		setFormData(updatedForm);
		setIsChanged(JSON.stringify(updatedForm) !== JSON.stringify(initialData));
	};

	const handleImageUpload = async () => {
		if (!selectedFile) return;
		setUploading(true);
		try {
			const uploadData = new FormData();
			uploadData.append('file', selectedFile);
			uploadData.append(
				'upload_preset',
				import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
			);

			const uploadRes = await axios.post(
				import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
				uploadData
			);

			const imageUrl = uploadRes.data.secure_url;

			// ✅ Update image and mark form as changed
			setFormData((prev) => {
				const updated = { ...prev, image: imageUrl };
				setIsChanged(JSON.stringify(updated) !== JSON.stringify(initialData));
				return updated;
			});
			toast.success('Image uploaded successfully');
		} catch (err) {
			console.error('Cloudinary upload error:', err);
			toast.error('Image upload failed');
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			const token = userState.user?.token;
			await axiosInstance.put(`/blog/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			toast.success('✅ Blog post updated');
			navigate('/manage-posts');
		} catch (err) {
			console.error('Update error:', err);
			setError('Failed to update blog post.');
		}
	};

	if (!post) return <div className='p-10 text-lg'>Loading post...</div>;

	return (
		<div className='max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6'>
			<h2 className='text-2xl font-bold text-gray-800'>Edit Blog Post</h2>
			{error && <p className='text-red-500'>{error}</p>}

			<form onSubmit={handleSubmit} className='space-y-4'>
				<input
					type='text'
					name='title'
					value={formData.title}
					onChange={handleChange}
					placeholder='Title'
					className='w-full border border-gray-300 rounded px-4 py-2'
					required
				/>

				<BlogEditor
					content={formData.content}
					setContent={(content) => {
						setFormData({ ...formData, content });
						setIsChanged(content !== initialData?.content);
					}}
				/>

				<input
					type='text'
					name='tags'
					value={formData.tags.join(', ')}
					onChange={handleTags}
					placeholder='Tags (comma separated)'
					className='w-full border border-gray-300 rounded px-4 py-2'
				/>

				<div className='space-y-2'>
					<label className='block font-medium text-gray-700'>
						Change Image
					</label>
					<input
						type='file'
						accept='image/*'
						onChange={(e) => setSelectedFile(e.target.files[0])}
					/>
					<button
						type='button'
						onClick={handleImageUpload}
						disabled={!selectedFile || uploading}
						className='text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition'
					>
						{uploading ? 'Uploading...' : 'Upload Image'}
					</button>
					{formData.image && (
						<img
							src={formData.image}
							alt='Current blog'
							className='w-full max-w-xs rounded mt-2'
						/>
					)}
				</div>

				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						name='published'
						checked={formData.published}
						onChange={handleChange}
					/>
					<span>Published</span>
				</label>

				<div className='flex justify-between mt-6 gap-4'>
					<button
						type='submit'
						disabled={!isChanged}
						className={`flex-1 px-4 py-2 text-white font-semibold rounded transition ${
							isChanged
								? 'bg-green-600 hover:bg-green-700'
								: 'bg-gray-400 cursor-not-allowed'
						}`}
					>
						Update Post
					</button>
					<button
						type='button'
						onClick={() => navigate('/manage-posts')}
						className='flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition'
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateBlog;
