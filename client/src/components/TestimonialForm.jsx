import { useState } from 'react';
import { submitTestimonial } from '../api/testimonialApi';

const TestimonialForm = ({ setTestimonials }) => {
	const [formData, setFormData] = useState({
		name: '',
		location: '',
		message: '',
	});
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const inputStyle =
		'w-full border-2 border-gray-300 p-3 rounded focus:bg-gray-500 focus:text-black focus:placeholder:text-black font-semibold resize-none focus:ring-2 focus:ring-indigo-400 placeholder:text-lg';

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.name || !formData.message) {
			setErrorMessage('Please fill out required fields.');
			setSuccessMessage('');
			return;
		}

		try {
			const newTestimonial = await submitTestimonial(formData);
			setTestimonials((prev) => [newTestimonial, ...prev]);
			setFormData({ name: '', location: '', message: '' });
			setSuccessMessage('Thank you for sharing your testimonial!');
			setErrorMessage('');
		} catch (err) {
			setErrorMessage('Failed to submit testimonial.');
			setSuccessMessage('');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg space-y-6'
		>
			{successMessage && (
				<div className='p-3 bg-green-100 text-green-800 rounded text-sm'>
					{successMessage}
				</div>
			)}
			{errorMessage && (
				<div className='p-3 bg-red-100 text-red-800 rounded text-sm'>
					{errorMessage}
				</div>
			)}

			<input
				type='text'
				name='name'
				value={formData.name}
				onChange={handleChange}
				placeholder='Your Name *'
				className={inputStyle}
			/>

			<input
				type='text'
				name='location'
				value={formData.location}
				onChange={handleChange}
				placeholder='Location (optional)'
				className={inputStyle}
			/>

			<textarea
				name='message'
				value={formData.message}
				onChange={handleChange}
				rows={5}
				placeholder='Your Testimonial *'
				className={inputStyle}
			></textarea>

			<div className='flex flex-col sm:flex-row justify-between gap-4'>
				<button
					type='button'
					onClick={() => setFormData({ name: '', location: '', message: '' })}
					className='bg-red-500 text-white px-6 py-3 rounded font-semibold hover:bg-red-400 transition duration-200'
				>
					Clear Form
				</button>
				<button
					type='submit'
					className='bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-500 transition duration-200'
				>
					Submit Testimonial
				</button>
			</div>
		</form>
	);
};

export default TestimonialForm;
