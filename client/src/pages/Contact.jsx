// @ts-nocheck
import { useContactContext } from '../contexts/ContactContext';
import Spinner from '../components/Spinner';
// import { validateContactForm } from '../utils/validators';
import SeoHead from '../components/SeoHead';
import JsonLd from '../components/JsonLd';
import { getContactPageSchema } from '../utils/schemaGenerators';

import AnimatedBackgroundWrapper from '../components/layouts/AnimatedBackgroundWrapper';
import ContactForm from '../components/ContactForm';

export default function Contact() {
	const { state } = useContactContext();
	const { loading } = state;

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	dispatch({ type: 'UPDATE_FIELD', field: name, value });
	// };

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const formData = { firstName, lastName, email, company, subject, message };

	// 	const error = validateContactForm(formData);
	// 	if (error) {
	// 		dispatch({ type: 'SUBMIT_FAILURE', payload: error });
	// 		return;
	// 	}

	// 	await submitContactForm(formData);
	// };

	if (loading) return <Spinner />;

	return (
		<>
			<SeoHead
				title='Contact Us | Blueberry Dairy'
				description="Have questions about our raw goat milk, farm pickups, or local deliveries? Contact Blueberry Dairy — we'd love to hear from you!"
				url='https://www.blueberrydairy.com/contact'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
			/>

			<JsonLd data={getContactPageSchema()} />

			<AnimatedBackgroundWrapper
				backgroundImageUrl='https://res.cloudinary.com/dzhweqopn/image/upload/v1749317846/appalachian_cabin_v5flx0.jpg'
				blurAmount={8}
				brightness={90}
				animation='animate-zoom-in-once'
			>
				<div className='grid md:grid-cols-[1.25fr_1fr] gap-6 sm:gap-40'>
					{/* Contact Form with glass effect */}
					<ContactForm />
					{/* Address Section */}
					<div className='text-white text-3xl space-y-4 mr-8'>
						<h1 className='text-5xl font-bold mb-2'>Visit Us!</h1>
						<p>Blueberry Dairy at Hickory Cove Orchards</p>
						<p>154 Pressmens Home Road</p>
						<p>Rogersville, TN 37857</p>
						<p className='flex items-center gap-2 text-white text-lg mt-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								className='w-6 h-6 text-white'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 5h2l.4 2M7 3h10l1 2h2M8 7h8M5 9h14l-1.34 6.72a2 2 0 01-1.97 1.64H8.31a2 2 0 01-1.97-1.64L5 9z'
								/>
							</svg>
							(423) 293-4487
						</p>
						<p>phopkins1757@gmail.com</p>

						{/* Badge */}
						<div className='mt-18'>
							<img
								src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749237561/blueberrydairy/product_images/pu0slgkfnuiauzjj0egs.png'
								alt='Blueberry Dairy Farm Badge'
								className='w-28 h-28 rounded-full bg-white/60 backdrop-blur-md shadow-md animate-float'
							/>
						</div>
					</div>
				</div>
			</AnimatedBackgroundWrapper>
		</>
	);
}
