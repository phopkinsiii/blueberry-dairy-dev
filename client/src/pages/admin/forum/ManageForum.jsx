// @ts-nocheck
// src/pages/admin/forum/ManageForum.jsx
import { useEffect, useState } from 'react';
import { useUserContext } from '../../../contexts/UserContext';
import {
	getManageablePosts,
	deletePost,
	deleteReply,
} from '../../../services/forumService';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Spinner';

export default function ManageForum() {
	const { state: userState } = useUserContext();
	const { role } = userState;

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (role === 'admin') {
			fetchManageablePosts();
		}
	}, [role]);

	const fetchManageablePosts = async () => {
		setLoading(true);
		try {
			const data = await getManageablePosts(); // ✅ No token needed
			setPosts(data);
		} catch (err) {
			console.error('❌ Error fetching manageable posts:', err);
			toast.error('Failed to load forum posts');
		} finally {
			setLoading(false);
		}
	};

	const handleDeletePost = async (postId) => {
		if (!window.confirm('Are you sure you want to delete this post?')) return;
		try {
			await deletePost(postId);
			toast.success('Post deleted');
			await fetchManageablePosts(); // Refresh list
		} catch (err) {
			console.error('❌ Error deleting post:', err);
			toast.error('Error deleting post');
		}
	};

	const handleDeleteReply = async (postId, replyId) => {
		if (!window.confirm('Delete this reply?')) return;
		try {
			await deleteReply(postId, replyId);
			toast.success('Reply deleted');
			await fetchManageablePosts(); // Refresh list
		} catch (err) {
			console.error('❌ Error deleting reply:', err);
			toast.error('Error deleting reply');
		}
	};

	if (loading) return <Spinner />;
	if (role !== 'admin') {
		return <p className='text-red-600 p-4'>Access denied.</p>;
	}

	return (
		<div className='p-6 max-w-5xl mx-auto'>
			<h1 className='text-3xl font-bold mb-6 text-indigo-700'>
				Manage Forum Posts
			</h1>
			{posts.length === 0 ? (
				<p className='text-gray-600'>No forum posts found.</p>
			) : (
				<div className='space-y-8'>
					{posts.map((post) => (
						<div key={post._id} className='bg-white p-6 rounded-lg shadow'>
							<div className='flex justify-between items-start'>
								<div>
									<h2 className='text-xl font-bold text-gray-900'>
										{post.title}
									</h2>
									<p className='text-sm text-gray-500'>
										By {post.author?.name || 'Unknown'} on{' '}
										{new Date(post.createdAt).toLocaleString()}
									</p>
								</div>
								<button
									onClick={() => handleDeletePost(post._id)}
									className='text-red-600 font-semibold hover:underline'
								>
									Delete Post
								</button>
							</div>
							<p className='mt-4 text-gray-800 whitespace-pre-line'>
								{post.content}
							</p>

							{post.replies?.length > 0 && (
								<div className='mt-6'>
									<h3 className='font-semibold mb-2 text-gray-700'>Replies:</h3>
									<ul className='space-y-4'>
										{post.replies.map((reply) => (
											<li
												key={reply._id}
												className='bg-gray-100 p-3 rounded flex justify-between items-start'
											>
												<div>
													<p className='text-sm text-gray-800'>
														{reply.content}
													</p>
													<p className='text-xs text-gray-500 mt-1'>
														By {reply.user?.name || 'User'} on{' '}
														{new Date(reply.createdAt).toLocaleString()}
													</p>
												</div>
												<button
													onClick={() => handleDeleteReply(post._id, reply._id)}
													className='text-red-500 text-sm font-medium ml-4'
												>
													Delete
												</button>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
