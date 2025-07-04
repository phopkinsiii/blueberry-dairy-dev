// @ts-nocheck
import { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import AnimatedBackgroundWrapper from '../components/layouts/AnimatedBackgroundWrapper';
import TestimonialForm from '../components/TestimonialForm';
import { fetchTestimonials } from '../api/testimonialApi';

export default function TestimonialsPage() {
	const [testimonials, setTestimonials] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const loadTestimonials = async () => {
			try {
				const data = await fetchTestimonials();
				setTestimonials(data);
			} catch (err) {
				setError('Failed to load testimonials.');
			} finally {
				setLoading(false);
			}
		};

		loadTestimonials();
	}, []);

	return (
		<>
			<SeoHead
				title='Customer Testimonials | Blueberry Dairy'
				description='See what others are saying about their experiences with Blueberry Dairy! Share your own story and join our growing community.'
				url='https://www.blueberrydairy.com/testimonials'
			/>

			<AnimatedBackgroundWrapper
				backgroundImageUrl='https://res.cloudinary.com/dzhweqopn/image/upload/v1749519200/sunset_appalachians_uaedll.jpg'
				blurAmount={8}
				brightness={90}
				animation='animate-zoom-in-once'
			>
				<div className='grid md:grid-cols-[1fr] gap-10 max-w-3xl mx-auto'>
					<div className='glass-effect p-6 rounded-lg shadow-lg'>
						<h1 className='text-5xl font-bold text-gray-200 mb-6 text-center'>
							Share Your Story
						</h1>
						<TestimonialForm setTestimonials={setTestimonials} />
					</div>

					{/* Testimonials List */}
					{loading ? (
						<p className='text-center text-white text-lg'>
							Loading testimonials...
						</p>
					) : error ? (
						<p className='text-center text-red-400 text-lg'>{error}</p>
					) : testimonials.length === 0 ? (
						<p className='text-center text-white text-lg'>
							No testimonials yet. Be the first to share your experience!
						</p>
					) : (
						<div className='space-y-6'>
							{testimonials.map((t) => (
								<div
									key={t._id}
									className='bg-white/70 backdrop-blur-md p-4 rounded-lg shadow-md'
								>
									<p className='italic text-gray-800 mb-2'>"{t.message}"</p>
									<p className='font-semibold text-gray-900'>
										– {t.name}
										{t.location && `, ${t.location}`}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</AnimatedBackgroundWrapper>
		</>
	);
}
