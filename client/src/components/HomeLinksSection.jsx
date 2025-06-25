import { Link } from 'react-router-dom';

const HomeLinksSection = () => {
	const links = [
		{
			title: 'Explore Our Farm',
			image:
				'https://res.cloudinary.com/dzhweqopn/image/upload/v1749237543/blueberrydairy/page_images/ddoigrvnxw4gh8xp4u6w.jpg',
			to: '/our-farm',
		},
		{
			title: 'Shop Our Products',
			image:
				'https://res.cloudinary.com/dzhweqopn/image/upload/v1750844822/milk_cinnamon_jkhasv.jpg',
			to: '/products',
			to: '/products',
		},
		{
			title: 'See Our Goats',
			image:
				'https://res.cloudinary.com/dzhweqopn/image/upload/v1749237517/blueberrydairy/goat_images/yuhdppuwq94dvwm0hnhf.jpg',
			to: '/goats',
		},
	];

	return (
		<section className='py-16 bg-gradient-to-b from-amber-50 via-lime-100 to-amber-100'>
			<div className='flex justify-center'>
				<div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
						{links.map((link) => (
							<Link
								key={link.title}
								to={link.to}
								className='group block overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow'
							>
								<img
									src={link.image}
									alt={link.title}
									className='w-full h-64 sm:h-72 md:h-80 lg:h-[400px] xl:h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-500'
								/>
								<div className='p-4'>
									<h3 className='text-3xl font-semibold text-gray-800 group-hover:text-green-700'>
										{link.title}
									</h3>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeLinksSection;
