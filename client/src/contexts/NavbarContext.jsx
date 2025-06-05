/* eslint-disable react-refresh/only-export-components */
// contexts/NavbarContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
// import { useLocation } from 'react-router-dom';

const NavbarContext = createContext();

// ⬅️ Moved outside so it's not a dependency in useEffect
// const excludedRoutes = ['/login', '/register', '/add-blog'];

export const NavbarProvider = ({ children }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 25);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<NavbarContext.Provider value={{ isScrolled }}>
			{children}
		</NavbarContext.Provider>
	);
};

export const useNavbarContext = () => useContext(NavbarContext);
