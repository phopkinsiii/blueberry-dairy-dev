// @ts-nocheck
import { useEffect, useRef } from 'react';

const PopoverMessage = ({ message, onClose }) => {
	const popoverRef = useRef();

	useEffect(() => {
		if (popoverRef.current) {
			popoverRef.current.focus();
		}
	}, []);

	return (
		<div
			ref={popoverRef}
			role='alertdialog'
			aria-modal='true'
			tabIndex='-1'
			className='fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm'
			onClick={onClose}
		>
			<div
				className='bg-white max-w-sm w-full rounded-lg p-6 shadow-lg transform transition-opacity duration-300 ease-out scale-100 animate-fade-in'
				onClick={(e) => e.stopPropagation()}
			>
				<p className='text-gray-800 text-center text-lg'>{message}</p>
				<button
					onClick={onClose}
					className='mt-4 mx-auto block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition'
				>
					Got it
				</button>
			</div>
		</div>
	);
};

export default PopoverMessage;

