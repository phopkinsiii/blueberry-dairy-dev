import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import { useUserContext } from '../contexts/UserContext.jsx';
import { toast } from 'react-toastify';
import validator from 'validator';

const ResetPassword = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const navigate = useNavigate();

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const { state, dispatch } = useUserContext();
	const [showPassword, setShowPassword] = useState(false); // 👈 Add this
	const [passwordError, setPasswordError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords don't match.");
			return;
		}

		if (!validator.isStrongPassword(password)) {
			setPasswordError(
				'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.'
			);
			return;
		}

		try {
			const data = await resetPassword(token, password, dispatch);
			toast.success(data.message || 'Password reset successfully.');
			navigate('/login');
		} catch {
			toast.error(state.error || 'Failed to reset password.');
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-50'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h2 className='text-2xl font-semibold mb-6 text-center'>
					Reset Your Password
				</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block mb-1 font-medium'>New Password</label>
						<input
							type={showPassword ? 'text' : 'password'}
							className='w-full border rounded px-3 py-2'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setPasswordError(''); // clear error on input
							}}
							required
						/>
					</div>
					<div>
						<label className='block mb-1 font-medium'>Confirm Password</label>
						<input
							type={showPassword ? 'text' : 'password'}
							className='w-full border rounded px-3 py-2'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<div className='mt-2 flex items-center space-x-2'>
						<input
							id='show-password'
							type='checkbox'
							checked={showPassword}
							onChange={() => setShowPassword((prev) => !prev)}
							className='h-4 w-4 text-indigo-600 border-gray-300 rounded'
						/>
						<label htmlFor='show-password' className='text-sm text-gray-600'>
							Show Password
						</label>
					</div>
                    {passwordError && (
	<p className='text-red-500 text-sm'>{passwordError}</p>
)}

					<button
						type='submit'
						disabled={state.loading}
						className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
					>
						{state.loading ? 'Resetting...' : 'Reset Password'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
