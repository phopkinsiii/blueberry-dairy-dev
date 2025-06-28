// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	IconChevronDown,
	IconChevronUp,
	IconInfoCircle,
	IconMilk,
} from '@tabler/icons-react';
import { farmLinks } from '../../constants/farmLinks';

const iconMap = {
	'/our-farm': IconInfoCircle,
	'/milk-records': IconMilk,
};

const FarmDropdown = ({ scrolled }) => {
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
				className={`flex items-center gap-2 text-2xl font-semibold px-4 py-2 transition-colors duration-300 ${
					scrolled
						? 'text-stone-800 hover:text-stone-950'
						: 'text-white hover:text-yellow-200'
				}`}
				aria-haspopup='true'
				aria-expanded={open}
				aria-controls='farm-dropdown'
			>
				<span>Farm Info</span>
				{open ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
			</button>

			{open && (
				<div
					id='farm-dropdown'
					role='menu'
					className='absolute left-0 mt-2 w-64 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in'
				>
					<ul className='py-2 text-base font-poppins text-gray-800'>
						{farmLinks.map(({ label, path }) => {
							const Icon = iconMap[path] || null;
							return (
								<li key={path}>
									<Link
										to={path}
										onClick={() => setOpen(false)}
										className='flex items-center gap-2 px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200 focus:outline-none'
										role='menuitem'
									>
										{Icon && <Icon size={16} />}
										<span>{label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default FarmDropdown;
