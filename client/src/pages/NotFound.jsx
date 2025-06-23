// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className='relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden'>
			{/* Background Image */}
			<img
				src='https://res.cloudinary.com/dzhweqopn/image/upload/v1750641018/404_error_img_yfommz.jpg'
				alt='404 not found'
				className='absolute inset-0 w-full h-full object-cover z-0 animate-zoom-in-once'
			/>

			{/* Overlay */}
			<div className='absolute inset-0 bg-black/60 z-10' />

			{/* Content */}
			<div className='relative z-20 text-center text-white px-6'>
				<h1 className='text-6xl md:text-7xl font-bold fade-in-grow drop-shadow-lg mb-4'>
					404
				</h1>
				<p className='text-xl md:text-2xl mb-8 animate-float-in'>
					Oops! The page you're looking for doesn't exist.
				</p>
				<Link
					to='/'
					className='inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition'
				>
					Go Back Home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
