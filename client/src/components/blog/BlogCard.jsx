// src/components/BlogCard.jsx
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateHelpers.js';
const BlogCard = ({ post }) => {


	return (
		<article className='bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6'>
			{post.image && (
				<img
					src={post.image}
					alt={post.title}
					className='w-full md:w-60 h-48 object-cover rounded-lg shadow-sm'
					loading='lazy'
				/>
			)}

			<div className='flex-1 space-y-2'>
				<h2 className='text-2xl font-semibold text-amber-800'>
					<Link to={`/blog/${post._id}`}>{post.title}</Link>
				</h2>

				<div className='flex items-center gap-x-4 text-sm text-gray-600'>
					<time dateTime={post.createdAt}>
						Posted: {formatDate(post.createdAt)}
					</time>
					<time dateTime={post.updatedAt}>
						Updated: {formatDate(post.updatedAt)}
					</time>
					{post.tags?.length > 0 && (
						<span className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs'>
							{post.tags[0]}
						</span>
					)}
				</div>

				<div
					className='prose line-clamp-3 text-gray-700'
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>

				<Link
					to={`/blog/${post._id}`}
					className='inline-block text-blue-600 hover:underline mt-2 text-sm'
				>
					Read more →
				</Link>
			</div>
		</article>
	);
};

export default BlogCard;
