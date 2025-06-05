// @ts-nocheck
// src/pages/ForumPost.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import ForumReplyForm from '../../components/forum/ForumReplyForm';
import Spinner from '../../components/Spinner';
import { getSinglePost } from '../../services/forumService'; // ✅ Import service directly

const ForumPost = () => {
	const { id } = useParams();
	const { state: userState } = useUserContext();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// ✅ Isolated fetch function to refresh post content
	const fetchPost = async () => {
		try {
			setLoading(true);
			const data = await getSinglePost(id);
			setPost(data);
		} catch (err) {
			setError('Post not found');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPost();
	}, [id]);

	if (loading) return <Spinner />;
	if (error) return <p className='text-red-600'>{error}</p>;
	if (!post) return <p className='text-gray-600'>Post not found.</p>;

	return (
		<section className='min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 px-4 py-8'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<Link
					to='/forum'
					className='inline-block text-blue-600 dark:text-blue-400 hover:underline mb-4'
				>
					← Back to Forum
				</Link>

				<div className='bg-white dark:bg-gray-800 p-6 rounded shadow'>
					<h1 className='text-3xl font-bold mb-2'>{post.title}</h1>
					<p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
						By {post.author?.name || 'Anonymous'} •{' '}
						{new Date(post.createdAt).toLocaleString()}
					</p>
					<p className='text-lg whitespace-pre-wrap'>{post.content}</p>
				</div>

				<div>
					<h2 className='text-2xl font-semibold mt-10 mb-4'>Replies</h2>
					{post.replies?.length > 0 ? (
						post.replies.map((reply) => (
							<div
								key={reply._id}
								className='bg-white dark:bg-gray-800 p-4 rounded shadow mb-4'
							>
								<p>{reply.content}</p>
								<p className='text-sm text-gray-500 mt-2'>
									By {reply.author?.name || 'Anonymous'} •{' '}
									{new Date(reply.createdAt).toLocaleString()}
								</p>
							</div>
						))
					) : (
						<p className='text-gray-500 dark:text-gray-400'>
							No replies yet. Be the first!
						</p>
					)}
				</div>

				{userState.user && (
					<div className='mt-8'>
						<ForumReplyForm postId={post._id} onReplySuccess={fetchPost} />
					</div>
				)}
			</div>
		</section>
	);
};

export default ForumPost;
