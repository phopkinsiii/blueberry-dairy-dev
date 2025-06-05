const Logo = ({ className = '' }) => {
	return (
		<div className='flex justify-center items-center w-full h-full'>
			<img
				src='/images/goat_logo1.png'
				alt='Blueberry Dairy Logo'
				className={`object-contain animate-float transition-transform ${className}`}
			/>
		</div>
	);
};

export default Logo;
