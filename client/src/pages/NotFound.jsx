// @ts-nocheck
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

const NotFound = () => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 px-4 text-center font-lora fade-in-focus'>
			<SeoHead
				title='404 - Page Not Found | Blueberry Dairy'
				description='Oops! The page you’re looking for doesn’t exist.'
			/>

			<img
				src='https://res.cloudinary.com/dzhweqopn/image/upload/v1750641018/404_error_img_yfommz.jpg'
				alt='Lost goat — 404 not found'
				className='max-w-md w-full mb-8 rounded-lg shadow-lg fade-in-grow'
			/>

			<h1 className='text-4xl font-bold text-gray-800 dark:text-white mb-4 fade-in-grow'>
				Page Not Found
			</h1>

			<p className='text-lg text-gray-600 dark:text-gray-300 mb-6 fade-in-grow'>
				Sorry, the page you're looking for doesn’t exist or was moved.
			</p>

			<Link
				to='/'
				className='inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105 fade-in-grow'
			>
				Return to Home
			</Link>
		</div>
	);
};

export default NotFound;
