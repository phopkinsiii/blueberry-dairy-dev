// src/pages/BlogPage.jsx
import { useEffect } from 'react';
import { useBlogContext } from '../../contexts/BlogContext';
import Spinner from '../../components/Spinner';
import BlogCard from '../../components/blog/BlogCard';
import SeoHead from '../../components/SeoHead';

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
				description='Read our farm blog to explore insights, stories, and updates from Blueberry Dairy—an organic farm in East Tennessee raising Nigerian Dwarf goats and growing fresh produce.'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
				url='https://www.blueberrydairy.com/blog'
			/>
			<div className='max-w-6xl mx-auto px-6 py-12 space-y-10'>
				<h1 className='text-5xl font-extrabold text-center text-amber-950 mb-12'>
					Blueberry Blog
				</h1>

				{posts.map((post) => (
					<BlogCard key={post._id} post={post} />
				))}
			</div>
		</>
	);
};

export default BlogPage;
