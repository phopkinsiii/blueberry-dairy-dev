// @ts-nocheck

import { useContactContext } from '../contexts/ContactContext';
import Spinner from '../components/Spinner';
import { validateContactForm } from '../utils/validators';

import SeoHead from '../components/SeoHead';

export default function Contact() {
	const { state, dispatch, submitContactForm } = useContactContext();
	const {
		firstName,
		lastName,
		email,
		company,
		subject,
		message,
		loading,
		successMessage,
		errorMessage,
	} = state;

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch({ type: 'UPDATE_FIELD', field: name, value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = { firstName, lastName, email, company, subject, message };

		// ✅ Run frontend validation
		const error = validateContactForm(formData);
		if (error) {
			dispatch({ type: 'SUBMIT_FAILURE', payload: error });
			return;
		}

		await submitContactForm(formData);
	};
	// ✅ Show spinner while submitting
	if (loading) return <Spinner />;

	return (
		<>
			<SeoHead
				title='Contact Us | Blueberry Dairy'
				description="Have questions about our raw goat milk, farm pickups, or local deliveries? Contact Blueberry Dairy — we'd love to hear from you!"
				url='https://www.blueberrydairy.com/contact'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
			/>
			<div
				className='bg-cover bg-center min-h-screen flex items-center justify-center px-6 py-20'
				style={{
					backgroundImage: `url('/images/blueberriesxl.jpg')`,
					fontFamily: `'Lora', serif`,
				}}
			>
				<div className='bg-white/30 backdrop-blur-md p-10 rounded-lg shadow-2xl max-w-3xl w-full'>
					<h2 className='text-4xl font-bold text-stone-800 mb-6 text-center'>
						Let’s Connect
					</h2>

					{successMessage && (
						<div className='mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded text-md text-center'>
							{successMessage}
						</div>
					)}

					{errorMessage && (
						<div className='mb-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded text-md text-center'>
							{errorMessage}
						</div>
					)}

					<form onSubmit={handleSubmit} className='grid gap-6'>
						<div className='grid sm:grid-cols-2 gap-6'>
							<input
								type='text'
								name='firstName'
								value={firstName}
								onChange={handleChange}
								placeholder='First Name'
								className='w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400'
							/>
							<input
								type='text'
								name='lastName'
								value={lastName}
								onChange={handleChange}
								placeholder='Last Name'
								className='w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400'
							/>
						</div>

						<input
							type='email'
							name='email'
							value={email}
							onChange={handleChange}
							placeholder='Email'
							className='w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400'
						/>

						<input
							type='text'
							name='company'
							value={company}
							onChange={handleChange}
							placeholder='Company (optional)'
							className='w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400'
						/>

						<input
							type='text'
							name='subject'
							value={subject}
							onChange={handleChange}
							placeholder='Subject'
							className='w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400'
						/>

						<textarea
							name='message'
							value={message}
							onChange={handleChange}
							rows={5}
							placeholder='Your message...'
							className='w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none'
						/>

						<div className='flex justify-between items-center mt-6'>
							<button
								type='button'
								onClick={() => dispatch({ type: 'RESET_FORM' })}
								className='bg-red-500 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-500 transition duration-200'
							>
								Clear Form
							</button>

							<button
								type='submit'
								className='bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-500 transition duration-200'
							>
								Send
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
