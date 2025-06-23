// src/components/goats/GoatCard.jsx
import { Link } from 'react-router-dom';
import { formatDate, getAgeInYearsAndMonths } from '../../utils/dateHelpers';

const GoatCard = ({ goat }) => {
	const image = goat.images?.[0]; // assume this is a full Cloudinary URL

	return (
		<div
			className='fade-in-grow bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col min-h-[500px] overflow-hidden'
			style={{ fontFamily: 'Poppins, sans-serif' }}
		>
			<Link to={`/goats/${goat._id}`}>
				{/* Goat Image */}
				{image ? (
					<div className='w-full'>
						<img
							src={image}
							alt={goat.nickname || 'Goat'}
							className='w-full object-cover aspect-[4/3]'
							loading='lazy'
						/>
					</div>
				) : (
					<div className='w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400'>
						No image
					</div>
				)}

				{/* Info */}
				<div className='p-4'>
					<h3 className='text-xl font-bold text-amber-800 mb-1'>
						{goat.nickname}
					</h3>
					<p className='text-sm text-gray-700'>ADGA ID: {goat.adgaId}</p>
					<p className='text-sm text-gray-700'>Gender: {goat.gender}</p>
					
					<p className='text-sm text-gray-700'>Born: {formatDate(goat.dob)}</p>
					<p className='text-sm text-gray-600 italic font-bold'>Age: {getAgeInYearsAndMonths(goat.dob)}</p>
					<p className='text-sm text-gray-700'>Sire: {goat.pedigree.sire}</p>
					<p className='text-sm text-gray-700'>Dam: {goat.pedigree.dam}</p>

					{goat.forSale && (
						<p className='text-green-700 font-semibold mt-1'>
							For Sale: ${goat.price}
						</p>
					)}
					<p className='italic'>Click the image for individual details</p>
				</div>
			</Link>
		</div>
	);
};

export default GoatCard;
