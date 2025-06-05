// src/pages/AccessDenied.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const AccessDenied = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/register');
		}, 5000); // 5 seconds

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className='relative flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6'>
			<div className='absolute inset-0 opacity-10 animate-pulse z-0 flex items-center justify-center'>
				<Logo className='w-1/2 max-w-[50vmin]' />
			</div>

			<div className='z-10'>
				<h1 className='text-4xl font-bold text-red-700 mb-4'>Access Denied</h1>
				<p className='text-gray-700 text-lg mb-6'>
					You don’t have permission to view this page.
				</p>
				<p className='text-gray-700 text-lg'>
					If you would like access to this resource, please register.
					Redirecting you to the registration page...
				</p>
			</div>
		</div>
	);
};

export default AccessDenied;
