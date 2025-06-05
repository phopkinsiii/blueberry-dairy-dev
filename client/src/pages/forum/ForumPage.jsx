// pages/ForumPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useForumContext } from '../../contexts/ForumContext';

const ForumPage = () => {
	const { posts, fetchPosts, loading, error } = useForumContext();

	useEffect(() => {
		fetchPosts();
	}, []); // ✅ Don't include fetchPosts here to avoid infinite loop

	return (
		<div className='min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 px-4 py-8'>
			<div className='max-w-4xl mx-auto'>
				<Link
					to='/forum/new'
					className='inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
				>
					New Post
				</Link>
				<h1 className='text-2xl font-bold mb-4'>Forum Posts</h1>

				{loading && <p>Loading posts...</p>}
				{error && <p className='text-red-600'>{error}</p>}

				<div className='space-y-4'>
					{posts.map((post) => (
						<Link to={`/forum/${post._id}`} key={post._id}>
							<div
								key={post._id}
								className='bg-white dark:bg-gray-800 p-4 rounded shadow'
							>
								<h2 className='text-xl font-semibold'>{post.title}</h2>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									{new Date(post.createdAt).toLocaleString()}
								</p>
								<p>{post.content}</p>
								<p className='text-sm text-gray-500'>
									By {post.author?.name || 'Anonymous'} •{' '}
									{new Date(post.createdAt).toLocaleString()}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default ForumPage;
