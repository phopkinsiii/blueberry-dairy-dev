// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	IconChevronDown,
	IconChevronUp,
	IconList,
	IconGenderFemale,
	IconGenderMale,
	IconDiscountCheck,
} from '@tabler/icons-react';

const goatLinks = [
	{ label: 'All Goats', path: '/goats', icon: IconList },
	{ label: 'Does', path: '/goats/does', icon: IconGenderFemale },
	{ label: 'Bucks', path: '/goats/bucks', icon: IconGenderMale },
	{ label: 'Goats for Sale', path: '/goats/for-sale', icon: IconDiscountCheck },
];

const GoatDropdown = ({ scrolled }) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const location = useLocation();

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => setOpen(false), [location]);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') setOpen(false);
		};
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, []);

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				ref={buttonRef}
				onClick={() => setOpen((prev) => !prev)}
				className={`flex items-center gap-2 text-2xl font-semibold transition-colors duration-300 ${
					scrolled
						? 'text-stone-800 hover:text-stone-950'
						: 'text-white hover:text-yellow-200'
				}`}
				aria-haspopup='true'
				aria-expanded={open}
				aria-controls='goat-dropdown'
			>
				<span>Our Goats</span>
				{open ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
			</button>

			{open && (
				<div
					id='goat-dropdown'
					role='menu'
					className='absolute left-0 mt-2 w-64 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in'
				>
					<ul className='py-2 text-base font-poppins text-gray-800'>
						{goatLinks.map((link) => (
							<li key={link.path}>
								<Link
									to={link.path}
									onClick={() => setOpen(false)}
									className='flex items-center gap-2 px-6 py-2 text-sm text-gray-700 hover:bg-amber-100 hover:text-amber-900 transition-colors duration-200 focus:outline-none'
									role='menuitem'
								>
									{link.icon && <link.icon size={16} />}
									<span>{link.label}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default GoatDropdown;
