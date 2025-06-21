import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ToggleTheme = () => {
	const { theme, toggleTheme } = useTheme();
	const [showTooltip, setShowTooltip] = useState(false);

	console.log('Tooltip visible:', showTooltip); // ✅ This is where you log

	return (
		<div
			className='relative flex flex-col items-end'
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			{showTooltip && (
				<span
					className='tooltip-glass mr-6'
					style={{
						opacity: 1,
						pointerEvents: 'auto',
					}}
				>
					Toggle Theme
				</span>
			)}

			<button
				onClick={toggleTheme}
				className='p-4 mt-8 rounded-full transition-colors duration-300 focus:outline-none bg-transparent hover:bg-stone-200 dark:hover:bg-stone-700'
				aria-label='Toggle theme'
			>
				{theme === 'dark' ? (
					<Sun className='w-6 h-6 text-yellow-400' />
				) : (
					<Moon className='w-6 h-6 text-stone-800' />
				)}
			</button>
		</div>
	);
};

export default ToggleTheme;
