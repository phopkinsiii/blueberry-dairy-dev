// @ts-nocheck
// src/pages/BlogPage.jsx
import { useEffect } from 'react';
import { useBlogContext } from '../../contexts/BlogContext';
import Spinner from '../../components/Spinner';
import BlogCard from '../../components/blog/BlogCard';
import SeoHead from '../../components/SeoHead';
import {
	truncate,
	stripHtml,
	extractKeywords,
	getDefaultImage,
	getSeoTimestamps,
} from '../../utils/seoUtils';
import JsonLd from '../../components/JsonLd';
import { getBlogPageSchema } from '../../utils/schemaGenerators';

import Footer from '../../components/Footer';
import AnimatedBackgroundWrapper from '../../components/layouts/AnimatedBackgroundWrapper';

const BlogPage = () => {
	const { state, fetchPosts } = useBlogContext();
	const { posts, loading, error } = state;

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	if (loading) return <Spinner />;
	if (error) return <div className='p-10 text-red-600'>{error}</div>;
	if (!posts || posts.length === 0)
		return <div className='p-10 text-gray-700'>No blog posts found.</div>;

	return (
		<>
			<SeoHead
				title='Farm Blog | Blueberry Dairy'
				description={truncate(
					stripHtml(
						'Explore farm stories, seasonal insights, and goat care wisdom from Blueberry Dairy in East Tennessee.'
					),
					160
				)}
				image={getDefaultImage()}
				url='https://www.blueberrydairy.com/blog'
				keywords={extractKeywords(
					'farm blog, Nigerian Dwarf goats, regenerative farming, East Tennessee, organic agriculture'
				)}
				{...getSeoTimestamps(posts)}
			/>
			{posts.length > 0 && <JsonLd data={getBlogPageSchema(posts)} />}
			<AnimatedBackgroundWrapper
				backgroundImageUrl='https://res.cloudinary.com/dzhweqopn/image/upload/v1750154908/tennessee_creek_utx3ex.jpg'
				blurAmount={8}
				brightness={90}
				animation='animate-zoom-in-once'
			>
				<div className='max-w-6xl mx-auto px-6 py-12 space-y-10'>
					<h1 className='text-5xl font-extrabold text-center text-amber-950 mb-12 fade-in-focus fade-in-grow'>
						Blueberry Blog
					</h1>

					{posts.map((post) => (
						<BlogCard key={post._id} post={post} />
					))}
				</div>
			</AnimatedBackgroundWrapper>
			<Footer />
		</>
	);
};

export default BlogPage;
