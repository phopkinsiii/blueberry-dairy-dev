// @ts-nocheck
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import AuthButton from './AuthButton';
import UserGreeting from './UserGreeting';
import AdminDropdown from './AdminDropdown';
import GoatDropdown from './goats/GoatDropdown';
import MobileGoatDropdown from './goats/MobileGoatDropdown';
import FarmDropdown from './farm/FarmDropdown';
import MobileFarmDropdown from './farm/MobileFarmDropdown';
import { useUserContext } from '../contexts/UserContext';
import { useCartContext } from '../contexts/CartContext';
import Logo from './Logo';

const StickyNavbar = () => {
	const { state: userState } = useUserContext();
	const { cartItems } = useCartContext();
	const cartItemCount = cartItems?.reduce(
		(sum, item) => sum + (item.quantity || 1),
		0
	);
	const isAdmin = userState.user?.role === 'admin';

	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const navigation = [
		{ name: 'Home', href: '/' },
		// { name: 'About', href: '/our-farm' }, // moved to dropdown
		{ name: 'Our Products', href: '/products' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Forum', href: '/forum' },
		{ name: 'Contact', href: '/contact' },
		// { name: 'Our Goats', href: '/goats' }, // handled separately
	];

	return (
		<nav className='fixed top-0 left-0 w-full z-50 min-h-[100px]'>
			<div
				className={`relative transition-all duration-300 ${
					scrolled ? 'backdrop-blur-md bg-white/20' : 'bg-transparent'
				}`}
			>
				{/* Background image */}
				<div
					className='absolute inset-0 z-[-1] bg-cover bg-center'
					style={{
						backgroundImage:
							"url('https://res.cloudinary.com/dzhweqopn/image/upload/v1749265835/sunrise_over_pasture2_z7nqq5.jpg')",
						opacity: scrolled ? 0.2 : 1,
						transition: 'opacity 0.3s ease-in-out',
					}}
				/>

				<div className='flex items-center justify-between max-w-8xl mx-auto px-6 pt-6 pb-4 text-xl'>
					{/* Left: Hamburger + Logo */}
					<div className='flex items-center gap-4'>
						{/* Hamburger (mobile only) */}
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className='md:hidden text-white focus:outline-none'
							aria-label='Toggle menu'
						>
							<svg
								className='h-8 w-8'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								{menuOpen ? (
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								) : (
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 6h16M4 12h16M4 18h16'
									/>
								)}
							</svg>
						</button>

						{/* Logo */}
						{/* Logo - visible only on md and up */}
						<div className='hidden md:block'>
							<Logo />
						</div>
					</div>

					{/* Center: Nav Links */}
					<ul
						className={`${
							menuOpen ? 'flex animate-slide-down' : 'hidden'
						} flex-col md:flex md:flex-row md:gap-10 gap-4 absolute md:static top-full left-0 w-full md:w-auto 
              bg-white md:bg-transparent p-6 md:p-0 z-40 text-center md:text-left text-2xl font-semibold`}
					>
						{navigation.map((item) => (
							<li key={item.name}>
								<NavLink
									to={item.href}
									onClick={() => setMenuOpen(false)}
									className={({ isActive }) =>
										`transition duration-300 ${
											isActive
												? 'text-green-600 text-3xl underline'
												: 'text-gray-800 md:text-white hover:text-amber-600'
										}`
									}
								>
									{item.name}
								</NavLink>
							</li>
						))}
						{/* ✅ Mobile Dropdowns: render here, but only on mobile */}
						<li className='md:hidden'>
							<MobileGoatDropdown closeMenu={() => setMenuOpen(false)} />
						</li>
						<li className='md:hidden'>
							<MobileFarmDropdown closeMenu={() => setMenuOpen(false)} />
						</li>
						{/* Desktop Dropdowns */}
						<li className='hidden md:block'>
							<GoatDropdown scrolled={scrolled} />
						</li>
						<li className='hidden md:block'>
							<FarmDropdown scrolled={scrolled} />
						</li>
					</ul>

					{/* Right: Auth controls and cart */}
					<div className='flex items-center space-x-4'>
						{isAdmin && (
							<div className='hidden md:block'>
								<AdminDropdown scrolled={scrolled} />
							</div>
						)}
						<div className='hidden md:block'>
							<UserGreeting />
						</div>
						<div className='hidden md:block'>
							<AuthButton />
						</div>

						{/* Cart icon - always visible */}
						<Link to='/cart' className='relative'>
							<ShoppingCartIcon className='h-8 w-8 text-white hover:text-yellow-300 transition' />
							{cartItemCount > 0 && (
								<span className='absolute -top-2 -right-2 text-sm bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold'>
									{cartItemCount}
								</span>
							)}
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default StickyNavbar;
