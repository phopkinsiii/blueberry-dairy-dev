// @ts-nocheck
// src/pages/ForumPost.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import ForumReplyForm from '../../components/forum/ForumReplyForm';
import Spinner from '../../components/Spinner';
import { getSinglePost } from '../../services/forumService'; // ✅ Import service directly
import {
	truncate,
	stripHtml,
	extractKeywords,
	getDefaultImage,
	getSeoTimestamps,
} from '../../utils/seoUtils';

import SeoHead from '../../components/SeoHead';
import JsonLd from '../../components/JsonLd';
import { getForumSchema } from '../../utils/schemaGenerators';
import AnimatedBackgroundWrapper from '../../components/layouts/AnimatedBackgroundWrapper';
import { formatDate } from '../../utils/dateHelpers';


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
			console.log(err);
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
		<>
			{post && (
				<SeoHead
					title={`${post.title} | Blueberry Dairy`}
					description={truncate(stripHtml(post.content), 160)}
					image={post.image || getDefaultImage()}
					url={`https://www.blueberrydairy.com/forum/${post._id}`}
					keywords={extractKeywords(`${post.title} ${post.content}`)}
					{...getSeoTimestamps([post])}
				/>
			)}

			<JsonLd data={getForumSchema(post)} />

			<AnimatedBackgroundWrapper
				backgroundImageUrl='https://res.cloudinary.com/dzhweqopn/image/upload/v1750201003/midnight_tennessee_knkyqo.jpg'
				blurAmount={8}
				brightness={90}
				animation='animate-zoom-in-once'
			>
				<section>
					<div className='max-w-4xl mx-auto space-y-6'>
						<Link
							to='/forum'
							className='inline-block text-blue-500 dark:text-blue-400 hover:underline mb-4'
						>
							← Back to Forum
						</Link>

						<div className='bg-white dark:bg-gray-800 p-6 rounded shadow'>
							<h1 className='text-3xl font-bold mb-2 text-white'>
								{post.title}
							</h1>
							<p className='text-sm text-gray-300 dark:text-gray-200 mb-4'>
								By {post.author?.name || 'Anonymous'} •{' '}
								{new Date(post.createdAt).toLocaleString()}
							</p>
							<p className='text-white text-lg whitespace-pre-wrap'>
								{post.content}
							</p>
						</div>

						<div>
							<h2 className='text-2xl font-semibold mt-10 mb-4'>Replies</h2>
							{post.replies?.length > 0 ? (
								post.replies.map((reply) => (
									<div
										key={reply._id}
										className='bg-white dark:bg-gray-800 p-4 rounded shadow mb-4 text-white'
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
			</AnimatedBackgroundWrapper>
		</>
	);
};

export default ForumPost;
