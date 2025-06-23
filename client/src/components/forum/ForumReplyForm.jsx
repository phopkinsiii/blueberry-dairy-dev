// @ts-nocheck
// src/pages/forum/ForumReplyForm.jsx
import { useState } from 'react';
import { useForumContext } from '../../contexts/ForumContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForumReplyForm = ({ postId }) => {
	const { addReply } = useForumContext();
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('');
	const [uploading, setUploading] = useState(false);
	const navigate = useNavigate();

	const handleImageUpload = async (file) => {
		if (!file) return;
		setUploading(true);
		const formData = new FormData();
		formData.append('file', file);
		formData.append(
			'upload_preset',
			import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
		);
		formData.append('folder', 'forum');

		try {
			const res = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
				method: 'POST',
				body: formData,
			});
			const data = await res.json();
			setContent((prev) => `${prev}\n\n![uploaded image](${data.secure_url})`);
		} catch (err) {
			console.error('Image upload error:', err);
			toast.error('Image upload failed');
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!content.trim()) return;

		const replyData = {
			content,
			author: author.trim() ? author.trim() : 'Anonymous',
		};

		try {
			await addReply(postId, replyData);
			toast.success('Reply posted!');
			setContent('');
			setAuthor('');
			setTimeout(() => navigate('/forum'), 500);
		} catch (err) {
			console.error('Reply failed:', err.message);
			toast.error('Failed to post reply');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 mt-8 p-6 rounded-lg bg-white/10 backdrop-blur-md text-white shadow-lg max-w-3xl mx-auto'
		>
			<h3 className='text-2xl font-bold'>Post a Reply</h3>

			<div className='flex flex-col gap-2'>
				<label className='font-semibold'>Attach an image</label>

				<label
					htmlFor='upload-image-reply'
					className='w-fit inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 shadow-md'
				>
					Choose Image
				</label>
				<input
					id='upload-image-reply'
					type='file'
					accept='image/*'
					disabled={uploading}
					onChange={(e) => handleImageUpload(e.target.files[0])}
					className='hidden'
				/>

				<input
					type='text'
					placeholder='Or paste image URL...'
					className='w-full border p-2 rounded bg-white text-black'
					onBlur={(e) => {
						if (e.target.value)
							setContent(
								(prev) => `${prev}\n\n![linked image](${e.target.value})`
							);
						e.target.value = '';
					}}
				/>
			</div>

			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				className='w-full h-28 p-3 rounded bg-black/30 border border-white/30 text-white placeholder-white placeholder:font-semibold placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-green-400'
				placeholder='Write your reply...'
			/>

			<input
				type='text'
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
				className='w-full p-3 rounded bg-black/30 border border-white/30 text-white placeholder-white placeholder:font-semibold placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-green-400'
				placeholder='Your name (optional)'
			/>

			<div className='flex justify-end'>
				<button
					type='submit'
					className='px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition duration-200 shadow-md'
				>
					Reply
				</button>
			</div>
		</form>
	);
};

export default ForumReplyForm;
