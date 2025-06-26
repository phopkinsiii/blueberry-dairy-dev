// @ts-nocheck
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import AuthButton from './AuthButton';
import UserGreeting from './UserGreeting';
import AdminDropdown from './AdminDropdown';
import GoatDropdown from './goats/GoatDropdown';
import MobileMenu from './MobileMenu';
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
		{ name: 'About', href: '/our-farm' },
		{ name: 'Our Products', href: '/products' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Forum', href: '/forum' },
		{ name: 'Contact', href: '/contact' },
		{ name: 'Our Goats', href: '/goats' }, // handled separately
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
						<Logo />
					</div>

					{/* Center: Nav Links */}
					<>
						<MobileMenu
							menuOpen={menuOpen}
							closeMenu={() => setMenuOpen(false)}
							navigation={navigation}
						/>

						<ul className='hidden md:flex md:flex-row md:gap-10 text-2xl font-semibold'>
							{navigation.map((item) =>
								item.name !== 'Our Goats' ? (
									<li key={item.name}>
										<NavLink
											to={item.href}
											className={({ isActive }) =>
												`transition duration-300 ${
													isActive
														? 'text-green-600 underline'
														: 'text-white hover:text-amber-600'
												}`
											}
										>
											{item.name}
										</NavLink>
									</li>
								) : null
							)}
							<li>
								<GoatDropdown scrolled={scrolled} />
							</li>
						</ul>
					</>

					{/* Right: Auth + Cart */}
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
