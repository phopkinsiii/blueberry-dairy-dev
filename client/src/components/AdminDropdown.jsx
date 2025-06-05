// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const dropdownSections = [
	{
		title: 'Products',
		links: [
			{ label: 'Add Product', path: '/add-product' },
			{ label: 'Manage Products', path: '/manage-products' },
			{ label: 'Update Inventory', path: '/admin/inventory' },
			{ label: 'View Orders', path: '/admin-orders' },
		],
	},
	{
		title: 'Blog',
		links: [
			{ label: 'Add Blog Post', path: '/add-blog' },
			{ label: 'Manage Blog Posts', path: '/manage-posts' },
		],
	},
	{
		title: 'Forum',
		links: [
			{ label: 'Add Forum Post', path: '/forum/new' },
			{ label: 'Manage Forum Posts', path: '/forum/manage' },
		],
	},
	{
		title: 'Users',
		links: [{ label: 'Manage Users', path: '/admin/users' }],
	},
		{
		title: 'Goats',
		links: [
			{ label: 'Add Goat', path: '/admin/goats/add' },
			// Future links can go here:
			// { label: 'Manage Goats', path: '/admin/goats/manage' },
		],
	},
];

const AdminDropdown = ({ scrolled }) => {
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState({});
	const dropdownRef = useRef();

	// Close dropdown on outside click
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const toggleSection = (title) => {
		setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
	};

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={() => setOpen((prev) => !prev)}
				className={`text-2xl font-semibold px-4 py-2 transition-colors duration-300 ${
					scrolled
						? 'text-stone-800 hover:text-stone-950'
						: 'text-white hover:text-yellow-200'
				}`}
			>
				Admin
			</button>

			{open && (
				<div className='absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50'>
					<ul className='py-2 text-base font-poppins text-gray-800 divide-y divide-gray-200'>
						{dropdownSections.map((section) => (
							<li key={section.title}>
								<button
									onClick={() => toggleSection(section.title)}
									className='w-full text-left px-4 py-2 flex justify-between items-center hover:bg-indigo-50'
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
									<ul className='bg-white'>
										{section.links.map((link) => (
											<li key={link.path}>
												<Link
													to={link.path}
													onClick={() => setOpen(false)}
													className='block px-6 py-2 text-sm hover:bg-indigo-100'
												>
													{link.label}
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
