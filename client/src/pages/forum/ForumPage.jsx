// @ts-nocheck
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	truncate,
	stripHtml,
	extractKeywords,
	getDefaultImage,
	getSeoTimestamps,
} from '../../utils/seoUtils';
import SeoHead from '../../components/SeoHead';
import { useForumContext } from '../../contexts/ForumContext';
import AnimatedBackgroundWrapper from '../../components/layouts/AnimatedBackgroundWrapper';
import { formatDate } from '../../utils/dateHelpers';

const ForumPage = () => {
	const { posts, fetchPosts, loading, error } = useForumContext();

	useEffect(() => {
		fetchPosts();
	}, []); // Avoid fetchPosts in deps to prevent loops

	return (
		<>
			{posts.length > 0 && (
				<SeoHead
					title='Community Forum | Blueberry Dairy'
					description={truncate(
						stripHtml(
							'Join the discussion on regenerative farming, dairy goat care, organic agriculture, and more in the Blueberry Dairy community forum.'
						),
						160
					)}
					image={getDefaultImage()}
					url='https://www.blueberrydairy.com/forum'
					keywords={extractKeywords(
						'regenerative farming, Nigerian Dwarf goats, dairy, sustainable agriculture, organic farming, community forum'
					)}
					{...getSeoTimestamps(posts)}
				/>
			)}

			<AnimatedBackgroundWrapper
				backgroundImageUrl='https://res.cloudinary.com/dzhweqopn/image/upload/v1750201003/midnight_tennessee_knkyqo.jpg'
				blurAmount={8}
				brightness={90}
				animation='animate-zoom-in-once'
			>
				<div className='max-w-4xl mx-auto'>
					<Link
						to='/forum/new'
						className='inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
					>
						New Post
					</Link>
					<h1 className='text-4xl font-bold mb-6 text-center text-white fade-in-focus fade-in-grow'>
						Forum Posts
					</h1>

					{loading && <p>Loading posts...</p>}
					{error && <p className='text-red-600'>{error}</p>}

					<div className='space-y-4'>
						{posts.map((post) => (
							<Link to={`/forum/${post._id}`} key={post._id}>
								<div className='bg-white dark:bg-gray-800 p-4 rounded shadow'>
									<h2 className='text-xl text-white italic font-semibold'>
										{post.title}
									</h2>

									<p className='text-sm text-gray-500 dark:text-gray-100'>
										By {post.author?.name || 'Anonymous'} •{' '}
										{formatDate(post.createdAt, {
											hour: 'numeric',
											minute: '2-digit',
										})}
									</p>

									<p className='text-white text-md'>{post.content}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</AnimatedBackgroundWrapper>
		</>
	);
};

export default ForumPage;
