// @ts-nocheck
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const MobileGoatDropdown = ({ closeMenu }) => {
	const [open, setOpen] = useState(false);
	const toggle = () => setOpen((prev) => !prev);

	return (
		<div className='md:hidden'>
			<button
				onClick={toggle}
				className='flex flex-col items-center justify-center w-full text-gray-800 font-semibold py-2 hover:text-amber-600'
			>
				<div className='flex items-center gap-2'>
					<span>Our Goats</span>
					{open ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
				</div>
			</button>

			{open && (
				<ul className='pl-4 mt-2 text-left text-xl space-y-1'>
					<li>
						<NavLink
							to='/goats'
							onClick={closeMenu}
							className='block text-gray-700 hover:text-amber-800'
						>
							All Goats
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/goats/does'
							onClick={closeMenu}
							className='block text-gray-700 hover:text-amber-800'
						>
							Does
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/goats/bucks'
							onClick={closeMenu}
							className='block text-gray-700 hover:text-amber-800'
						>
							Bucks
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/goats/for-sale'
							onClick={closeMenu}
							className='block text-gray-700 hover:text-amber-800'
						>
							Goats for Sale
						</NavLink>
					</li>
				</ul>
			)}
		</div>
	);
};

export default MobileGoatDropdown;
