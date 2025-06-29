// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	IconChevronDown,
	IconChevronUp,
	IconInfoCircle,
	IconMilk,
	IconClipboardList,
} from '@tabler/icons-react';
import { farmLinks } from '../../data/farmLinks';

const iconMap = {
	'/our-farm': IconInfoCircle,
	'/milk-records': IconMilk,
	'/health-records': IconClipboardList,
	'/breeding-records': IconClipboardList,
};

const FarmDropdown = ({ scrolled }) => {
	const [open, setOpen] = useState(false);
	const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
	const dropdownRef = useRef(null);
	const location = useLocation();

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
				setOpenSubmenuIndex(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		setOpen(false);
		setOpenSubmenuIndex(null);
	}, [location]);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				setOpen(false);
				setOpenSubmenuIndex(null);
			}
		};
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, []);

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={() => setOpen((prev) => !prev)}
				className={`flex items-center gap-2 text-2xl font-semibold transition-colors duration-300 ${
					scrolled
						? 'text-stone-800 hover:text-stone-950'
						: 'text-white hover:text-yellow-200'
				}`}
				aria-haspopup='true'
				aria-expanded={open}
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
						{farmLinks.map((item, idx) => {
							const Icon = item.icon || iconMap[item.path];

							if (item.children) {
								return (
									<li key={item.label}>
										<button
											className='flex justify-between items-center w-full px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200'
											onClick={() =>
												setOpenSubmenuIndex((prev) =>
													prev === idx ? null : idx
												)
											}
										>
											<span className='flex items-center gap-2'>
												{Icon && <Icon size={16} />}
												{item.label}
											</span>
											{openSubmenuIndex === idx ? (
												<IconChevronUp size={16} />
											) : (
												<IconChevronDown size={16} />
											)}
										</button>
										{openSubmenuIndex === idx && (
											<ul className='pl-8 pb-2'>
												{item.children.map((child) => (
													<li key={child.path}>
														<Link
															to={child.path}
															className='block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-800 transition'
															onClick={() => {
																setOpen(false);
																setOpenSubmenuIndex(null);
															}}
														>
															{child.label}
														</Link>
													</li>
												))}
											</ul>
										)}
									</li>
								);
							}

							return (
								<li key={item.path}>
									<Link
										to={item.path}
										onClick={() => setOpen(false)}
										className='flex items-center gap-2 px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200'
										role='menuitem'
									>
										{Icon && <Icon size={16} />}
										<span>{item.label}</span>
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
