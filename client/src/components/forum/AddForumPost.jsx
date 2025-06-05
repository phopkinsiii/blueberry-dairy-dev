// src/pages/AddForumPost.jsx
import ForumPostForm from './ForumPostForm';
import { useForumContext } from '../../contexts/ForumContext';
import { useNavigate } from 'react-router-dom';

const AddForumPost = () => {
	const { fetchPosts } = useForumContext();
	const navigate = useNavigate();

	const handlePostSuccess = () => {
		fetchPosts();           // ✅ refresh posts in context
		navigate('/forum');     // ✅ redirect to forum after post
	};

	return (
		<div className="min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 px-4 py-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">Add a New Forum Post</h1>
				<ForumPostForm onPostSuccess={handlePostSuccess} />
			</div>
		</div>
	);
};

export default AddForumPost;
