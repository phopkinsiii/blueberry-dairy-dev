// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	IconChevronDown,
	IconChevronUp,
	IconPlus,
	IconList,
	IconPackage,
	IconShoppingCart,
	IconArticle,
	IconUser,
	IconMessageCircle,
	IconLayoutGridAdd,
	IconUserCog,
} from '@tabler/icons-react';

const dropdownSections = [
	{
		title: 'Products',
		links: [
			{ label: 'Add Product', path: '/add-product', icon: IconPlus },
			{ label: 'Manage Products', path: '/manage-products', icon: IconList },
			{
				label: 'Update Inventory',
				path: '/admin/inventory',
				icon: IconPackage,
			},
			{ label: 'View Orders', path: '/admin-orders', icon: IconShoppingCart },
		],
	},
	{
		title: 'Blog',
		links: [
			{ label: 'Add Blog Post', path: '/add-blog', icon: IconPlus },
			{ label: 'Manage Blog Posts', path: '/manage-posts', icon: IconArticle },
		],
	},
	{
		title: 'Forum',
		links: [
			{ label: 'Add Forum Post', path: '/forum/new', icon: IconLayoutGridAdd },
			{
				label: 'Manage Forum Posts',
				path: '/admin/forum',
				icon: IconMessageCircle,
			},
		],
	},
	{
		title: 'Users',
		links: [{ label: 'Manage Users', path: '/admin/users', icon: IconUserCog }],
	},
	{
		title: 'Goats',
		links: [
			{ label: 'Add Goat', path: '/admin/goats/add', icon: IconPlus },
			{ label: 'Manage Goats', path: '/manage-goats', icon: IconList },
		],
	},
];

const AdminDropdown = ({ scrolled }) => {
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState({});
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const location = useLocation();

	// Close on outside click
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Close on route change
	useEffect(() => {
		setOpen(false);
	}, [location]);

	// Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') setOpen(false);
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	// Toggle a section open/closed
	const toggleSection = (title) => {
		setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
	};

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
				aria-controls='admin-dropdown'
			>
				<span>Admin</span>
				{open ? (
					<IconChevronUp
						size={20}
						className='transition-transform duration-200'
					/>
				) : (
					<IconChevronDown
						size={20}
						className='transition-transform duration-200'
					/>
				)}
			</button>

			{open && (
				<div
					id='admin-dropdown'
					role='menu'
					className='absolute right-0 mt-2 w-64 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in'
				>
					<ul className='py-2 text-base font-poppins text-gray-800 divide-y divide-gray-200'>
						{dropdownSections.map((section) => (
							<li key={section.title}>
								<button
									onClick={() => toggleSection(section.title)}
									className='w-full text-left px-4 py-2 flex justify-between items-center hover:bg-indigo-50 focus:outline-none'
									aria-expanded={expanded[section.title]}
								>
									<span className='font-bold text-indigo-700'>
										{section.title}
									</span>
									{expanded[section.title] ? (
										<IconChevronUp size={18} className='text-indigo-700' />
									) : (
										<IconChevronDown size={18} className='text-indigo-700' />
									)}
								</button>

								{expanded[section.title] && (
									<ul className='bg-white' role='group'>
										{section.links.map((link) => (
											<li key={link.path}>
												<Link
													to={link.path}
													onClick={() => setOpen(false)}
													className='flex items-center gap-2 px-6 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 transition-colors duration-200 focus:outline-none focus:bg-indigo-200'
													role='menuitem'
												>
													{link.icon && <link.icon size={16} />}
													<span>{link.label}</span>
												</Link>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default AdminDropdown;
