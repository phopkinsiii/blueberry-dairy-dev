// src/pages/forum/ForumPostForm.jsx
import { useState } from 'react';
import { useForumContext } from '../../contexts/ForumContext';
import { Title, Meta, Link as HeadLink } from 'react-head';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForumPostForm = ({ onPostSuccess }) => {
	const { addPost } = useForumContext();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !content) return;

		const postData = {
			title,
			content,
			author: author.trim() ? author.trim() : 'Anonymous',
		};

		try {
			await addPost(postData);
			 toast.success('Post created successfully!');
      setTimeout(() => navigate('/forum'), 500); // brief delay to allow toast
			setTitle('');
			setContent('');
			setAuthor('');
			onPostSuccess?.();
		} catch (err) {
			console.error('Post creation failed:', err.message);
		}
	};

	return (
		<>
			<Title>Start a New Forum Post | Blueberry Dairy</Title>
			<Meta
				name='description'
				content='Join the discussion on our community forum. Share ideas, ask questions, or chat with other farm supporters.'
			/>
			<HeadLink rel='canonical' href='https://blueberrydairy.com/forum/new' />

			<div
				className='bg-cover bg-center min-h-screen flex items-center justify-center px-6 py-20'
				style={{
					backgroundImage: `url('/images/blueberriesxl.jpg')`, // Or use another farm-themed image
					fontFamily: `'Lora', serif`,
				}}
			>
				<div className='bg-white/30 dark:bg-white/10 backdrop-blur-md p-10 rounded-lg shadow-2xl max-w-3xl w-full'>
					<h2 className='text-4xl font-bold text-stone-800 dark:text-stone-100 mb-6 text-center'>
						Start a New Discussion
					</h2>

					<form onSubmit={handleSubmit} className='grid gap-6'>
						<input
							type='text'
							placeholder='Post Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='w-full border-2 border-gray-100 p-3 rounded focus:outline-none focus:bg-gray-200 placeholder-white placeholder:font-semibold placeholder:text-lg'
						/>

						<textarea
							placeholder="What's on your mind?"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={5}
							className='w-full border-2 border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white placeholder:font-semibold placeholder:text-lg'
						/>

						<input
							type='text'
							placeholder='Your name (optional)'
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							className='w-full border-2 border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white placeholder:font-semibold placeholder:text-lg'
						/>

						<div className='flex justify-between items-center'>
							<button
								type='button'
								onClick={() => {
									setTitle('');
									setContent('');
									setAuthor('');
								}}
								className='bg-red-500 text-white px-6 py-3 rounded font-semibold hover:bg-red-600 transition duration-200'
							>
								Clear
							</button>

							<button
								type='submit'
								className='bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-500 transition duration-200'
							>
								Post
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ForumPostForm;
