// @ts-nocheck
import React from 'react';
import StickyNavbar from './StickyNavbar';
import { useNavbarContext } from '../contexts/NavbarContext';




const NavbarLayout = ({ children }) => {
	const { isScrolled } = useNavbarContext();



	return (
		
		<>
					{/* Skip Link for Screen Reader / Keyboard Users */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only absolute top-2 left-2 bg-white text-black p-2 rounded z-50"
			>
				Skip to main content
			</a>
		
			{/* Sticky Navbar */}
			<StickyNavbar isScrolled={isScrolled} />



			{/* Page content */}
			<main id="main-content" className='pt-24'>
				{children}
			</main>
		</>
	);
};

export default NavbarLayout;
