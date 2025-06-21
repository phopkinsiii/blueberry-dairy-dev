// @ts-nocheck
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MobileGoatDropdown = ({ closeMenu }) => {
	const [open, setOpen] = useState(false);

	return (
		<li className='md:hidden'>
			<button
				onClick={() => setOpen((prev) => !prev)}
				className='flex justify-between items-center w-full text-gray-800 hover:text-amber-600 text-2xl font-semibold'
			>
				<span>Our Goats</span>
				<svg
					className={`h-6 w-6 transform transition-transform ${
						open ? 'rotate-180' : ''
					}`}
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 9l-7 7-7-7'
					/>
				</svg>
			</button>

			<div
				className={`transition-all duration-300 ease-in-out overflow-hidden ${
					open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
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
			</div>
		</li>
	);
};

export default MobileGoatDropdown;
