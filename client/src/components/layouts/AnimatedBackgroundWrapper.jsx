// src/components/layouts/AnimatedBackgroundWrapper.jsx
// @ts-nocheck
import React from 'react';

const AnimatedBackgroundWrapper = ({
	backgroundImageUrl,
	children,
	className = '',
	blurAmount = 8,
	brightness = 90,
	animation = 'animate-zoom-in-once',
}) => {
	return (
		<div className={`relative min-h-screen w-full overflow-hidden font-lora ${className}`}>
			{/* Animated background layer */}
			<div
				className={`absolute inset-0 bg-cover bg-center z-0 ${animation}`}
				style={{
					backgroundImage: `url('${backgroundImageUrl}')`,
					filter: `blur(${blurAmount}px) brightness(${brightness}%)`,
				}}
			/>

			{/* Foreground content */}
			<div className='relative z-10 px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-8xl mx-auto'>
				{children}
			</div>
		</div>
	);
};

export default AnimatedBackgroundWrapper;
