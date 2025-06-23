import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext.jsx';
import { requestPasswordReset } from '../services/authService';
import { toast } from 'react-toastify';
import Logo from '../components/Logo.jsx';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const { state, dispatch } = useUserContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await requestPasswordReset(email, dispatch);
			toast.success(data.message || 'Reset link sent.');
		} catch {
			toast.error(state.error);
		}
	};

	return (
		<div className='flex min-h-screen'>
			<div className='w-1/2 flex items-center justify-center px-8 bg-gray-50'>
				<div className='max-w-md w-full'>
					<h2 className='text-3xl font-bold mb-6 text-gray-800'>
						Forgot Password?
					</h2>
					<p className='text-gray-600 mb-4'>
						Enter your email and we’ll send you a reset link.
					</p>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label className='block text-lg font-medium'>Email</label>
							<input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className='mt-1 w-full px-4 py-3 border rounded'
							/>
						</div>
						<button
							type='submit'
							disabled={state.loading}
							className='w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-500'
						>
							{state.loading ? 'Sending...' : 'Send Reset Link'}
						</button>
					</form>
					<p className='text-sm mt-4 text-center text-gray-700'>
						Back to{' '}
						<Link to='/login' className='text-indigo-600 hover:underline'>
							Login
						</Link>
					</p>
				</div>
			</div>
			<div className='w-1/2 flex items-center justify-center bg-gradient-to-br from-green-100 to-gray-200'>
				<Logo />
			</div>
		</div>
	);
};

export default ForgotPassword;
