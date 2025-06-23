const footerNavigation = {
	main: [
		{ name: 'Home', href: '/' },
		{ name: 'Blog', href: '#' },
		{ name: 'Products', href: '/products' },
		{ name: 'Contact Us', href: '/contact' },
		{ name: 'Accessibility', href: '/accessibility' },
		{ name: 'Partners', href: '#' },
	],
	social: [
		{
			name: 'Facebook',
			href: 'https://www.facebook.com/profile.php?id=61575926251092',
			icon: (props) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path
						fillRule='evenodd'
						d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
						clipRule='evenodd'
					/>
				</svg>
			),
		},
	],
};

const Footer = () => {
	return (
		<footer className='w-full bg-gray-700 text-white'>
			<div className='max-w-screen-2xl mx-auto px-6 py-20 sm:py-24'>
				<nav
					aria-label='Footer'
					className='-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6'
				>
					{footerNavigation.main.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className='hover:text-gray-200 transition'
						>
							{item.name}
						</a>
					))}
				</nav>

				<div className='mt-16 flex justify-center gap-x-10'>
					{footerNavigation.social.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className='hover:text-gray-400 transition'
						>
							<span className='sr-only'>{item.name}</span>
							<item.icon aria-hidden='true' className='w-6 h-6' />
						</a>
					))}
				</div>

				<p className='mt-10 text-center text-sm/6'>
					&copy; 2024 Blueberry Dairy and Hickory Cove Orchards, Inc. All rights
					reserved.
				</p>

				{/* Logo at the bottom */}
				<div className='mt-10 flex justify-center'>
					<div className='bg-white rounded-full p-2 shadow-md'>
						<img
							src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749237561/blueberrydairy/product_images/pu0slgkfnuiauzjj0egs.png'
							alt='Blueberry Dairy Logo'
							className='w-20 h-20 object-contain'
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
