// src/components/goats/SaleGoatsCard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getForSaleGoats } from '../../services/goatService';

const SaleGoatsCard = () => {
	const [goats, setGoats] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchGoats = async () => {
			try {
				const data = await getForSaleGoats();
				setGoats(data);
			} catch (err) {
				console.error('Failed to fetch goats for sale:', err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchGoats();
	}, []);

	return (
		<section>
			<div
				className='fade-in-grow bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col min-h-[580px] overflow-hidden'
				style={{ fontFamily: 'Poppins, sans-serif' }}
			>
				<img
					src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749601857/goat_sale_banner_cjyfvl.jpg'
					alt='Goats for Sale'
					className='w-full h-64 object-cover rounded-t-xl'
					loading='lazy'
				/>

				<div className='flex flex-col flex-grow p-4'>
					<h3 className='text-lg font-semibold text-gray-900 mb-1 line-clamp-2'>
						Goats for Sale
					</h3>
					<p className='text-gray-700 text-sm line-clamp-3 mb-1'>
						Our goats are nurtured with holistic, natural care on clean pasture.
						Each one comes from strong ADGA-registered lines and receives
						personal, hands-on attention to ensure excellent health and
						milkability.
					</p>
					<span className='text-blue-600 text-md mt-1'> </span>

					<div className='mt-auto pt-4'>
						<button
							onClick={() => navigate('/goats/for-sale')}
							disabled={goats.length === 0 || loading}
							className={`w-full px-4 py-2 rounded text-white transition ${
								goats.length === 0 || loading
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-green-600 hover:bg-green-700'
							}`}
						>
							{loading
								? 'Loading...'
								: goats.length === 0
									? 'No Goats Available'
									: 'View Goats for Sale'}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SaleGoatsCard;
