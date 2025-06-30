// @ts-nocheck
import SeoHead from '../../components/SeoHead';
import { useEffect } from 'react';
import { useGoatContext } from '../../contexts/GoatContext';
import GoatCard from '../../components/goats/GoatCard';
import Spinner from '../../components/Spinner';
import AnimatedBackgroundWrapper from '../../components/layouts/AnimatedBackgroundWrapper';
import {
	truncate,
	stripHtml,
	extractKeywords,
	getDefaultImage,
	getSeoTimestamps,
} from '../../utils/seoUtils';
import JsonLd from '../../components/JsonLd';
import {
	getBreadcrumbSchema,
	getGoatListSchema,
} from '../../utils/schemaGenerators';

const goatsBreadcrumbItems = [
	{
		name: 'Home',
		url: 'https://www.blueberrydairy.com',
	},
	{
		name: 'Our Goats',
		url: 'https://www.blueberrydairy.com/goats',
	},
];

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
				title='Our Nigerian Dwarf Dairy Goats | Blueberry Dairy'
				description={truncate(
					stripHtml(
						'Meet our Nigerian Dwarf dairy goats raised on our organic East Tennessee farm. Learn about pedigrees, awards, and goats for sale.'
					),
					160
				)}
				image={getDefaultImage()}
				url='https://www.blueberrydairy.com/goats'
				keywords={extractKeywords(
					'Nigerian Dwarf dairy goats, organic goat farm, pedigree goats, goats for sale, East Tennessee farm'
				)}
				{...getSeoTimestamps(goats)} // ← goats must be loaded
			/>
			<>
				<JsonLd json={getBreadcrumbSchema(goatsBreadcrumbItems)} />
				<JsonLd
					data={getGoatListSchema(
						goats,
						'Our Goats',
						goatsBreadcrumbItems[1].url
					)}
				/>
			</>

			<AnimatedBackgroundWrapper
				backgroundImageUrl='https://res.cloudinary.com/dzhweqopn/image/upload/v1750104760/pasture_wood_fence_cropped_fulgdk.jpg'
				blurAmount={8}
				brightness={90}
				animation='animate-zoom-in-once'
			>
				{/* Content layer */}
				<div className='relative z-10 max-w-7xl mx-auto py-16 px-6'>
					<h1 className='text-5xl font-bold text-center text-amber-900 mb-12'>
						Meet Our Herd
					</h1>

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 auto-rows-fr'>
						{state.goats.map((goat) => (
							<GoatCard key={goat._id} goat={goat} />
						))}
					</div>
				</div>
			</AnimatedBackgroundWrapper>
		</>
	);
};

export default GoatList;
