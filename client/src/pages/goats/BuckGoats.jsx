// @ts-nocheck
import { useEffect } from 'react';
import { useGoatContext } from '../../contexts/GoatContext';
import GoatCard from '../../components/goats/GoatCard';
import Spinner from '../../components/Spinner';
import SeoHead from '../../components/SeoHead';
import AnimatedBackgroundWrapper from '../../components/layouts/AnimatedBackgroundWrapper';
import JsonLd from '../../components/JsonLd';
import { getGoatListSchema } from '../../utils/schemaGenerators';
import {
	extractKeywords,
	getDefaultImage,
	getSeoTimestamps,
} from '../../utils/seoUtils';

const BuckGoats = () => {
	const { state, fetchBucks } = useGoatContext();
	const { goats, loading, error } = state;

	useEffect(() => {
		fetchBucks();
	}, [fetchBucks]);

	if (loading) return <Spinner />;
	if (error) return <div className='text-red-600 p-6'>{error}</div>;
	if (!goats || goats.length === 0)
		return <div className='text-gray-700 p-6'>No bucks currently listed.</div>;

	return (
		<>
			<SeoHead
				title='Our Bucks | Blueberry Dairy'
				description='Meet the Nigerian Dwarf dairy bucks at Blueberry Dairy. These registered bucks contribute strong genetics to our ADGA-registered herd.'
				image={getDefaultImage()}
				url='https://www.blueberrydairy.com/goats/bucks'
				keywords={extractKeywords(
					'Nigerian Dwarf bucks, dairy goat herd sires, ADGA bucks, Blueberry Dairy'
				)}
				{...getSeoTimestamps(goats)}
			/>

			<JsonLd
				data={getGoatListSchema(
					goats,
					'Nigerian Dwarf Dairy Bucks',
					'https://www.blueberrydairy.com/goats/bucks'
				)}
			/>

			<AnimatedBackgroundWrapper
				backgroundImageUrl='https://res.cloudinary.com/dzhweqopn/image/upload/v1750104760/pasture_wood_fence_cropped_fulgdk.jpg'
				blurAmount={8}
				brightness={90}
				animation='animate-zoom-in-once'
			>
				<div className='relative z-10 max-w-7xl mx-auto py-16 px-6'>
					<h1 className='text-5xl font-bold text-center text-amber-900 mb-12'>
						Our Herd Sires
					</h1>

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 auto-rows-fr'>
						{goats.map((goat) => (
							<GoatCard key={goat._id} goat={goat} />
						))}
					</div>
				</div>
			</AnimatedBackgroundWrapper>
		</>
	);
};

export default BuckGoats;
