// src/pages/Accessibility.jsx
import SeoHead from '../components/SeoHead';

export default function Accessibility() {
	return (
		<>
			<SeoHead
				title='Accessibility | Blueberry Dairy'
				description='Learn how Blueberry Dairy ensures accessibility for all users and complies with digital accessibility standards.'
				url='https://www.blueberrydairy.com/accessibility'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
			/>

			<div className='min-h-screen bg-gray-900 text-white px-6 py-20 sm:px-8 lg:px-16'>
				<div className='max-w-4xl mx-auto'>
					<h1 className='text-4xl font-bold mb-6'>Accessibility Statement</h1>

					<p className='text-lg leading-relaxed mb-6 text-gray-300'>
						Blueberry Dairy is committed to providing a website that is
						accessible to the widest possible audience, regardless of technology
						or ability. We strive to ensure that our content and user experience
						meet the requirements outlined in the Web Content Accessibility
						Guidelines (WCAG) 2.1, Level AA.
					</p>

					<h2 className='text-2xl font-semibold mt-10 mb-4'>Our Commitment</h2>
					<p className='text-gray-300 mb-6 leading-relaxed'>
						We are continuously working to enhance the usability of our website
						and make our content accessible to people with disabilities,
						including those using assistive technologies like screen readers,
						keyboard navigation, or voice control tools.
					</p>

					<h2 className='text-2xl font-semibold mt-10 mb-4'>Known Issues</h2>
					<p className='text-gray-300 mb-6 leading-relaxed'>
						This site is actively developed and maintained. While we aim for
						full accessibility, there may be areas needing improvement,
						especially during ongoing feature additions or design updates. If
						you discover a barrier to accessibility, we want to hear from you.
					</p>

					<h2 className='text-2xl font-semibold mt-10 mb-4'>Contact Us</h2>
					<p className='text-gray-300 mb-2'>
						If you have trouble accessing any part of our website, need help
						with a specific task, or have suggestions for improvement, please
						reach out:
					</p>
					<ul className='text-gray-300 list-disc list-inside mb-6'>
						<li>
							Email:{' '}
							<a
								href='mailto:info@blueberrydairy.com'
								className='text-indigo-400 hover:underline'
							>
								info@blueberrydairy.com
							</a>
						</li>
						<li>Phone: (123) 456-7890</li>
					</ul>

					<p className='text-gray-400 text-sm'>Last updated: May 2025</p>
				</div>
			</div>
		</>
	);
}
