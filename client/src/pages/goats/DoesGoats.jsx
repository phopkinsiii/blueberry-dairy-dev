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

const DoesGoats = () => {
	const { state, fetchDoes } = useGoatContext();
	const { goats, loading, error } = state;

	useEffect(() => {
		fetchDoes();
	}, [fetchDoes]);

	if (loading) return <Spinner />;
	if (error) return <div className='text-red-600 p-6'>{error}</div>;
	if (!goats || goats.length === 0)
		return <div className='text-gray-700 p-6'>No does currently listed.</div>;

	return (
		<>
			<SeoHead
				title='Our Does | Blueberry Dairy'
				description='Meet the Nigerian Dwarf dairy does at Blueberry Dairy. These registered, award-winning does form the heart of our organic milking herd.'
				image={getDefaultImage()}
				url='https://www.blueberrydairy.com/goats/does'
				keywords={extractKeywords(
					'Nigerian Dwarf does, dairy goats, ADGA does, Blueberry Dairy'
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
						Our Dairy Does
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

export default DoesGoats;
