import { Link as RouterLink } from 'react-router-dom';

const PurchaseOptionsCard = () => {
	return (
		<>
			{/* Purchase Options Section */}
			<section className='w-full bg-stone-100 py-12 px-4 sm:px-8 lg:px-16'>
				<div className='max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-8 shadow-xl bg-white rounded-2xl overflow-hidden'>
					{/* Image */}
					<div className='w-full md:w-1/2'>
						<div
							className='h-full w-full min-h-[16rem] md:min-h-[24rem] bg-cover bg-center'
							style={{
								backgroundImage:
									"url('https://res.cloudinary.com/dzhweqopn/image/upload/v1750282815/home_seo_image2_tp43iq.jpg')",
							}}
						/>
					</div>

					{/* Text Content */}
					<div className='w-full md:w-1/2 p-6 sm:p-10 space-y-6'>
						<h2 className='text-3xl sm:text-4xl font-bold text-indigo-900'>
							How to Buy from Blueberry Dairy
						</h2>
						<p className='text-gray-700 text-lg'>
							However you like to shop, we’ve got you covered! Here are the ways
							you can bring home our fresh goat milk, organic fruit, and more:
						</p>
						<ul className='list-disc list-inside text-gray-800 space-y-2'>
							<li>
								<strong>Knoxville Farmer’s Market:</strong> Come say hi on
								Saturdays and browse our full lineup in person.
							</li>
							<li>
								<strong>On-Farm Purchase:</strong> Visit us in Rogersville, TN
								(map below) for the freshest possible selection.
							</li>
							<li>
								<strong>Website Pickup Orders:</strong> Place your order online
								and pick up at the farm or market—easy and convenient!
							</li>
							<li>
								<strong>Local Delivery:</strong> Live within 25 miles of
								Rogersville? We’ll deliver by appointment—just reach out!
							</li>
						</ul>
						<RouterLink
							to='/contact'
							className='inline-block mt-6 px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-md transition duration-300'
						>
							Get in Touch
						</RouterLink>
					</div>
				</div>
			</section>
		</>
	);
};

export default PurchaseOptionsCard;
