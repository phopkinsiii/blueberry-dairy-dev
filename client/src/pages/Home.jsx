// @ts-nocheck
import SlideShow from '../components/SlideShow';
import ScrollingBanner from '../components/ScrollingBanner.jsx';
import HomeLinksSection from '../components/HomeLinksSection.jsx';
import { Link as RouterLink } from 'react-router-dom';
import SeoHead from '../components/SeoHead.jsx';

import FarmMap from '../components/FarmMap.jsx';

const Home = () => {
	return (
		<>
			<SeoHead
				title='Blueberry Dairy | Organic Farm in East Tennessee'
				description='Welcome to Blueberry Dairy — a regenerative organic farm in East Tennessee offering organic apples, blueberries, and raw goat milk from Nigerian Dwarf goats. Experience sustainable agriculture and natural goodness.'
				url='https://blueberrydairy.com/'
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
			/>

			<ScrollingBanner />

			<section
				className='relative w-full h-[60vh] sm:h-[70vh] bg-cover bg-center flex items-center justify-center text-white'
				style={{
					backgroundImage: "url('/images/mountain_in_clouds.jpeg')",
				}}
			>
				{/* Dark overlay */}
				<div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/60'></div>

				{/* Content */}
				<div className='relative z-10 max-w-4xl px-6 text-center space-y-6'>
					<h1 className='text-3xl sm:text-4xl font-bold leading-snug drop-shadow-md pt-0'>
						Blueberry Dairy at Hickory Cove Orchards
					</h1>
					<p className='text-lg sm:text-xl drop-shadow-lg text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-md inline-block'>
						You want healthy, natural food that nourishes your body and your
						family. At Blueberry Dairy and Hickory Cove Orchards, we grow
						nutrient-dense, organically raised food with care, right here in
						East Tennessee. You don't have to settle for processed groceries,
						laden with chemicals and trucked in from far away—come discover
						local food that makes a difference.
					</p>
					<RouterLink
						to='/products'
						aria-label='Browse our local farm products'
						className='inline-block px-6 py-6 bg-stone-400 hover:bg-amber-700 text-white font-semibold rounded-md text-lg shadow-lg transition-all duration-300'
					>
						Shop Local Products
					</RouterLink>
				</div>
			</section>

			<HomeLinksSection />
			<div className='bg-white min-h-screen flex flex-col items-center'>
				<SlideShow />
				<FarmMap />
			</div>
		</>
	);
};

export default Home;
