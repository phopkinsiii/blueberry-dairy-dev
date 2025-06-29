// @ts-nocheck
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { farmLinks } from '../../data/farmLinks';

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const MobileFarmDropdown = ({ closeMenu }) => {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	const toggle = () => setOpen((prev) => !prev);

	// Close on route change
	useState(() => {
		setOpen(false);
	}, [location.pathname]);

	return (
		<div className='w-full'>
			<button
				onClick={toggle}
				className='flex flex-col items-center justify-center w-full text-gray-800 font-semibold py-2 hover:text-amber-600'
			>
				<div className='flex items-center gap-2'>
					<span>Farm Info</span>
					{open ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
				</div>
			</button>

			{open && (
				<ul className='ml-4 text-gray-700 text-base'>
					{farmLinks.map((link) =>
						link.children ? (
							<li key={link.label}>
								<p className='px-4 pt-2 font-medium text-sm text-gray-500'>
									{link.label}
								</p>
								<ul className='pl-2 text-sm'>
									{link.children.map((child) => (
										<li key={child.path}>
											<Link
												to={child.path}
												onClick={closeMenu}
												className='block px-6 py-1 hover:text-amber-800'
											>
												{child.label}
											</Link>
										</li>
									))}
								</ul>
							</li>
						) : (
							<li key={link.path}>
								<Link
									to={link.path}
									onClick={closeMenu}
									className='block px-6 py-2 hover:text-amber-800'
								>
									{link.label}
								</Link>
							</li>
						)
					)}
				</ul>
			)}
		</div>
	);
};

export default MobileFarmDropdown;
