import { useContactContext } from '../contexts/ContactContext';
import { validateContactForm } from '../utils/validators';
const ContactForm = () => {
	const { state, dispatch, submitContactForm } = useContactContext();
	const {
		firstName,
		lastName,
		email,
		company,
		subject,
		message,
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

		const error = validateContactForm(formData);
		if (error) {
			dispatch({ type: 'SUBMIT_FAILURE', payload: error });
			return;
		}

		await submitContactForm(formData);
	};
	const inputStyle =
		'w-full border-2 border-gray-300 p-3 rounded focus:bg-gray-500 focus:text-black focus:placeholder:text-black font-semibold resize-none focus:ring-2 focus:ring-indigo-400 placeholder:text-lg';
	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg space-y-6 contact-form'
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

				<div className='grid sm:grid-cols-2 gap-6'>
					<input
						type='text'
						name='firstName'
						value={firstName}
						onChange={handleChange}
						placeholder='First Name'
						className={inputStyle}
					/>
					<input
						type='text'
						name='lastName'
						value={lastName}
						onChange={handleChange}
						placeholder='Last Name'
						className={inputStyle}
					/>
				</div>

				<input
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
					placeholder='Email'
					className={inputStyle}
				/>

				<input
					type='text'
					name='company'
					value={company}
					onChange={handleChange}
					placeholder='Company (optional)'
					className={inputStyle}
				/>

				<input
					type='text'
					name='subject'
					value={subject}
					onChange={handleChange}
					placeholder='Subject'
					className={inputStyle}
				/>

				<textarea
					name='message'
					value={message}
					onChange={handleChange}
					rows={5}
					placeholder='Your message...'
					className={inputStyle}
				/>

				<div className='flex justify-between items-center'>
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
		</>
	);
};

export default ContactForm;
