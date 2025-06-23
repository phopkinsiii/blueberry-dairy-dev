// @ts-nocheck
import { useEffect } from 'react';
import { useGoatContext } from '../../contexts/GoatContext';
import GoatCard from '../../components/goats/GoatCard';
import Spinner from '../../components/Spinner';
import SeoHead from '../../components/SeoHead';
import AnimatedBackgroundWrapper from '../../components/layouts/AnimatedBackgroundWrapper';
import {
	extractKeywords,
	getDefaultImage,
	getSeoTimestamps,
} from '../../utils/seoUtils';

import JsonLd from '../../components/JsonLd';
import { getGoatListSchema } from '../../utils/schemaGenerators';

const ForSaleGoats = () => {
	const { state, fetchForSaleGoats } = useGoatContext();
	const { goats, loading, error } = state;

	useEffect(() => {
		fetchForSaleGoats();
	}, [fetchForSaleGoats]);

	if (loading) return <Spinner />;
	if (error) return <div className='text-red-600 p-6'>{error}</div>;
	if (!goats || goats.length === 0)
		return (
			<div className='text-gray-700 p-6'>No goats currently for sale.</div>
		);

	return (
		<>
			<SeoHead
				title='Goats for Sale | Blueberry Dairy'
				description='View our available Nigerian Dwarf goats for sale. All goats are ADGA registered, well-socialized, and raised with care on our East Tennessee farm.'
				image={getDefaultImage()}
				url='https://www.blueberrydairy.com/goats/for-sale'
				keywords={extractKeywords(
					'goats for sale, Nigerian Dwarf goats, dairy goats, registered goats, Blueberry Dairy'
				)}
				{...getSeoTimestamps(goats)}
			/>

			<JsonLd
				data={getGoatListSchema(
					goats,
					'Nigerian Dwarf Dairy Does',
					'https://www.blueberrydairy.com/goats/does'
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
						Goats for Sale
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

export default ForSaleGoats;
