// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import {
	validateRegisterData,
	validateStrongPassword,
	getPasswordStrength,
} from '../utils/validators';
import { useUserContext } from '../contexts/UserContext';
import { registerUser } from '../services/authService';
import DarkPageLayout from '../components/layouts/DarkPageLayout';
import Spinner from '../components/Spinner.jsx';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import PopoverMessage from '../components/PopoverMessage';

const Register = () => {
	const navigate = useNavigate();
	const { state, dispatch } = useUserContext();
	const [showPopover, setShowPopover] = useState(false);

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		const error = validateRegisterData(formData);
		if (error) {
			setError(error);
			return;
		}
		const passwordError = validateStrongPassword(formData.password);
		if (passwordError) {
			setError(passwordError);
			return;
		}
		try {
			console.log('🔍 formData being submitted:', formData);
			await registerUser(formData, dispatch);
			toast.success(
				`Welcome, ${formData.firstName}! Your account has been created.`,
				{
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					theme: 'colored',
				}
			);

			navigate('/');
		} catch (error) {
			setError(error.response?.data?.message || 'Registration Failed');
		}
	};
	if (state.loading) return <Spinner />;

	const { strength } = getPasswordStrength(formData.password);
	const isPasswordStrong = strength === 'Strong';

	return (
		<DarkPageLayout>
			<div className='max-w-lg mx-auto p-6 bg-gray-800 shadow-md rounded-md'>
				<h2 className='text-2xl font-bold mb-4 text-gray-300'>Register</h2>

				{/* {state.loading && <Spinner />} */}
				{error && (
					<p className='text-red-500' role='alert' aria-live='assertive'>
						{error}
					</p>
				)}

				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						type='text'
						className='w-full p-3 border border-white rounded-md'
						name='firstName'
						placeholder='First Name'
						value={formData.firstName}
						onChange={handleChange}
					/>

					<input
						type='text'
						className='w-full p-3 border border-white rounded-md'
						name='lastName'
						placeholder='Last Name'
						value={formData.lastName}
						onChange={handleChange}
					/>

					<input
						type='email'
						className='w-full p-3 border border-white rounded-md'
						name='email'
						placeholder='Email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<input
						type={showPassword ? 'text' : 'password'}
						className='w-full p-3 border border-white rounded-md'
						name='password'
						placeholder='Password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<PasswordStrengthMeter password={formData.password} />

					<label className='inline-flex items-center text-sm text-gray-200'>
						<input
							type='checkbox'
							checked={showPassword}
							onChange={(e) => setShowPassword(e.target.checked)}
							className='mr-2'
						/>
						Show Password
					</label>

					<button
						type='submit'
						onClick={(e) => {
							if (!isPasswordStrong) {
								e.preventDefault(); // block form submit
								setShowPopover(true);
							}
						}}
						className={`w-full px-4 py-3 font-semibold rounded-md transition 
	${
		isPasswordStrong
			? 'bg-green-600 hover:bg-green-700 text-white'
			: 'bg-gray-400 cursor-not-allowed text-white'
	}`}
					>
						Register
					</button>
				</form>
			</div>
			{showPopover && (
				<PopoverMessage
					message='Your password must be at least 8 characters and include uppercase, lowercase, a number, and a symbol.'
					onClose={() => setShowPopover(false)}
				/>
			)}
		</DarkPageLayout>
	);
};

export default Register;
