import { Link, useLocation } from 'react-router-dom';

const Logo = ({ className = '' }) => {
	const location = useLocation();

	return (
		<Link to='/'>
			<img
				key={location.pathname}
				src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749237561/blueberrydairy/product_images/pu0slgkfnuiauzjj0egs.png'
				alt='Blueberry Dairy Logo'
				className={`w-20 h-20 rounded-full object-cover bg-white/60 backdrop-blur-sm p-1 shadow-lg ring-2 ring-amber-950 animate-float-in ${className}`}
			/>
		</Link>
	);
};

export default Logo;
