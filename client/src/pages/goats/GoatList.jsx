// @ts-nocheck
import SeoHead from '../../components/SeoHead';
import { useEffect } from 'react';
import { useGoatContext } from '../../contexts/GoatContext';
import GoatCard from '../../components/goats/GoatCard';
import Spinner from '../../components/Spinner';

const GoatList = () => {
	const { state, fetchGoats } = useGoatContext();
	const { goats, loading, error } = state;

	useEffect(() => {
		fetchGoats();
	}, [fetchGoats]);

	if (loading) return <Spinner />;
	if (error) return <div className='text-red-600 p-6'>{error}</div>;

	if (!goats || goats.length === 0)
		return <div className='text-gray-700 p-6'>No goats found.</div>;

	return (
		<>
			<SeoHead
				title='Nigerian Dwarf Dairy Goats | Blueberry Dairy'
				description='Browse our Nigerian Dwarf dairy goats, raised on a regenerative farm with care and quality genetics. Meet our herd and discover goats for sale.'
				url='https://www.blueberrydairy.com/our-goats'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
			/>
			<div
				className='min-h-screen bg-cover bg-center bg-no-repeat relative'
				style={{
					backgroundImage: `url('/images/pasture_scene.jpg')`, // You can change this to any path or Cloudinary URL
				}}
			>
				{/* Optional overlay to make text more readable */}
				<div className='absolute inset-0 bg-white/70 backdrop-blur-sm'></div>

				{/* Content layer */}
				<div className='relative z-10 max-w-7xl mx-auto py-16 px-6'>
					<h1 className='text-4xl font-bold text-center text-amber-900 mb-12'>
						Meet Our Herd
					</h1>

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 auto-rows-fr'>
						{state.goats.map((goat) => (
							<GoatCard key={goat._id} goat={goat} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default GoatList;
