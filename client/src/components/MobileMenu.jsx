// src/components/MobileMenu.jsx
// @ts-nocheck
import { NavLink } from 'react-router-dom';
import MobileGoatDropdown from './goats/MobileGoatDropdown';

const MobileMenu = ({ menuOpen, closeMenu, navigation }) => {
	return (
		<ul
			className={`${
				menuOpen ? 'flex animate-slide-down' : 'hidden'
			} flex-col md:hidden gap-4 absolute top-full left-2 right-2 w-[calc(100%-1rem)] 
      bg-white/90 p-6 z-40 text-center text-xl font-semibold rounded-xl shadow-xl backdrop-blur-md ring-1 ring-gray-300`}
		>
			{navigation.map((item) =>
				item.name !== 'Our Goats' ? (
					<li key={item.name}>
						<NavLink
							to={item.href}
							onClick={closeMenu}
							className={({ isActive }) =>
								`block py-2 px-4 rounded transition duration-200 ${
									isActive
										? 'bg-green-100 text-green-700'
										: 'text-gray-800 hover:bg-amber-100 hover:text-amber-600'
								}`
							}
						>
							{item.name}
						</NavLink>
					</li>
				) : null
			)}

			{/* Mobile Goat Dropdown */}
			<MobileGoatDropdown closeMenu={closeMenu} />
		</ul>
	);
};

export default MobileMenu;
