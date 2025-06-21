// @ts-nocheck
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogContext } from '../../contexts/BlogContext';
import SeoHead from '../../components/SeoHead';
import {
	stripHtml,
	truncate,
	extractKeywords,
	getDefaultImage,
} from '../../utils/seoUtils';
import JsonLd from '../../components/JsonLd';
import { getBlogSchema } from '../../utils/schemaGenerators';

import AnimatedBackgroundWrapper from '../../components/layouts/AnimatedBackgroundWrapper';

const BlogPost = () => {
	const { id } = useParams();
	const { state, fetchPostById } = useBlogContext();
	const { singlePost: post, loading, error } = state;

	useEffect(() => {
		if (id) fetchPostById(id);
	}, [id, fetchPostById]);

	if (loading || !post)
		return <div className='p-10 text-lg'>Loading post...</div>;
	if (error) return <div className='p-10 text-red-600'>{error}</div>;
	if (!post) return null;

	return (
		<>
			<SeoHead
				title={`${post.title} | Blueberry Dairy`}
				description={truncate(stripHtml(post.content || ''), 160)}
				image={post.image || getDefaultImage()}
				url={`https://www.blueberrydairy.com/blog/${post._id}`}
				keywords={extractKeywords(`${post.title} ${post.content}`)}
				createdAt={post.createdAt}
				updatedAt={post.updatedAt}
			/>
			<JsonLd data={getBlogSchema(post)} />

			<AnimatedBackgroundWrapper
				backgroundImageUrl='https://res.cloudinary.com/dzhweqopn/image/upload/v1750154908/tennessee_creek_utx3ex.jpg'
				blurAmount={8}
				brightness={90}
				animation='animate-zoom-in-once'
			>
				{/* Main column container */}
				<div className='w-full max-w-7xl pl-8 pr-4'>
					{/* Banner Title in dark overlay */}
					{/* Optional banner image above title */}
					{post.image && (
						<img
							src={post.image}
							alt={post.title}
							className='w-full rounded-xl shadow-md mb-6'
						/>
					)}

					{/* Title below image */}
					<div className='bg-black/70 px-6 py-12 rounded-xl'>
						<h1 className='text-white text-5xl md:text-6xl font-extrabold text-left drop-shadow-xl leading-tight'>
							{post.title}
						</h1>
					</div>

					{/* Post Content */}
					<div className='bg-black/80 p-8 sm:p-12 rounded-xl mb-16 mt-8 shadow-md'>
						<div
							className='prose prose-invert prose-2xl text-white font-semibold max-w-full'
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
					</div>
				</div>
			</AnimatedBackgroundWrapper>
		</>
	);
};

export default BlogPost;
