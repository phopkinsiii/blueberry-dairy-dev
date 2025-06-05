// src/components/goats/GoatCard.jsx
import { Link } from 'react-router-dom';

const GoatCard = ({ goat }) => {
	const image = goat.images?.[0]; // Show only the first image

	return (
		<div className='bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-stone-200 min-h-[600px] flex flex-col'>
			<Link to={`/goats/${goat._id}`}>
				{/* Image */}
				<div className='h-full w-full'>
					<img
						src={goat.images?.[0] || '/images/goat_logo1.png'}
						alt={goat.nickname}
						className='w-full h-[500px] sm:h-[600px] object-cover rounded-lg shadow-md'
						loading='lazy'
					/>
				</div>

				{/* Info section */}
				<div className='p-4'>
					<h3 className='text-xl font-bold text-amber-800 mb-2'>
						{goat.nickname}
					</h3>
					<p className='text-sm text-gray-600'>ADGA ID: {goat.adgaId}</p>
					<p className='text-sm text-gray-600'>Gender: {goat.gender}</p>

					{goat.forSale && (
						<p className='text-green-700 font-semibold mt-2'>
							For Sale: ${goat.price}
						</p>
					)}
				</div>
			</Link>
		</div>
	);
};

export default GoatCard;
