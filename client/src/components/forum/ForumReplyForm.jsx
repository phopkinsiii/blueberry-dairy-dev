// components/ReplyForm.jsx
import { useState } from 'react';
import { useForumContext } from '../../contexts/ForumContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForumReplyForm = ({ postId }) => {
	const { addReply } = useForumContext();
	const [content, setContent] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!content) return;

		await addReply(postId, { content });
		toast.success('Reply posted!');
		setTimeout(() => navigate('/forum'), 500);
		setContent('');
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-2 mt-4'>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				className='w-full border p-2 rounded h-24'
				placeholder='Write your reply...'
			/>
			<button
				type='submit'
				className='px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700'
			>
				Reply
			</button>
		</form>
	);
};

export default ForumReplyForm;
