// @ts-nocheck
import { useState } from 'react';
import { useForumContext } from '../../contexts/ForumContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForumReplyForm = ({ postId }) => {
	const { addReply } = useForumContext();
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('');
	const navigate = useNavigate();

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
