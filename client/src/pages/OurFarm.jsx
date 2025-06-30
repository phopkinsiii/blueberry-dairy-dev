// @ts-nocheck
'use client';
import SeoHead from '../components/SeoHead';
import JsonLd from '../components/JsonLd';
import {
	getOrganizationSchema,
	getBreadcrumbSchema,
} from '../utils/schemaGenerators';

const values = [
	{
		name: 'Regenerate the Land',
		description:
			'We farm in a way that gives back more than we take — building soil health, capturing carbon, and increasing biodiversity to create a living legacy.',
	},
	{
		name: 'Grow with Purpose',
		description:
			'We produce food that nourishes the body and respects the Earth. From our goats to our orchards, everything is grown with intention and care.',
	},
	{
		name: 'Protect Future Generations',
		description:
			'We believe that we should leave the planet better than we found it. Our commitment is to sustainability not just for today, but for tomorrow’s children.',
	},
	{
		name: 'Live in Harmony with Nature',
		description:
			'We honor the rhythms of nature — respecting the seasons, the soil, and the animals. Farming with nature, not against it, is the path we walk daily.',
	},
	{
		name: 'Stewardship Over Ownership',
		description:
			'The land doesn’t belong to us — we belong to it. We care for our farm as a sacred trust, with humility, accountability, and deep respect.',
	},
	{
		name: 'Beauty Has Purpose',
		description:
			'We believe beauty in farming is more than visual — it’s an expression of health, balance, and the deep joy that comes from working with living things.',
	},
];

const aboutBreadcrumbItems = [
	{
		name: 'Home',
		url: 'https://www.blueberrydairy.com',
	},
	{
		name: 'About the Farm',
		url: 'https://www.blueberrydairy.com/our-farm',
	},
];

export default function OurFarm() {
	return (
		<>
			{/* SEO Metadata */}
			<SeoHead
				title='About Our Farm | Blueberry Dairy'
				description="Discover Blueberry Dairy's regenerative farming practices, Nigerian Dwarf dairy goats, and commitment to healthy food and a cleaner planet."
				image='https://res.cloudinary.com/dzhweqopn/image/upload/v1750275064/seo_soil_in_hand_zg3sew.jpg'
				url='https://www.blueberrydairy.com/our-farm'
			/>

			<>
				<JsonLd data={getOrganizationSchema()} />
				<JsonLd json={getBreadcrumbSchema(aboutBreadcrumbItems)} />
			</>

			<div
				className='relative min-h-screen bg-cover bg-center bg-fixed'
				style={{
					backgroundImage:
						"url('https://res.cloudinary.com/dzhweqopn/image/upload/v1749265835/sunrise_over_pasture2_z7nqq5.jpg')",
				}}
			>
				{/* Combined dark + gradient overlay */}
				<div className='absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/40 to-black/30' />
				<main className='relative z-10 min-h-screen'>
					{/* Hero section */}
					<div className='relative isolate -z-10'>
						<div className='overflow-hidden'>
							<div className='mx-auto max-w-7xl px-8 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32'>
								<div className='mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center'>
									<div className='relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl'>
										<h1 className='text-5xl font-semibold tracking-tight  text-white sm:text-7xl'>
											Healthy Food From Healthy Soil!
										</h1>
										<p className='mt-8 text-3xl font-medium  text-white sm:max-w-md sm:text-xl/8 lg:max-w-none'>
											Health-conscious consumers often struggle to find fresh,
											organic food. Blueberry Dairy provides fresh, organic
											fruits and raw dairy products so you can enjoy nutritious,
											chemical-free foods that boost your immune system. We
											believe in producing wholesome food the way nature
											intended. From our organically grown apples and
											blueberries to our pasture-raised Nigerian Dwarf dairy
											goats, everything we do is centered on sustainability,
											integrity, and your family's health.
										</p>
									</div>
									<div className='mt-14 flex justify-end gap-6 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0'>
										<div className='ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80'>
											<div className='relative'>
												<img
													alt='Blueberries on the bush'
													src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749289805/blueberries_on_bush_m6wznh.jpg'
													className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
												/>
												<div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
											</div>
										</div>
										<div className='mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36'>
											<div className='relative'>
												<img
													alt='Farm house from the garden'
													src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749237548/blueberrydairy/page_images/gpjtsi0g9p8hi9pjvx08.jpg'
													className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
												/>
												<div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
											</div>
											<div className='relative'>
												<img
													alt='Healthy Soil in Hand'
													src='https://res.cloudinary.com/dzhweqopn/image/upload/v1750272279/soil_in_hand_hqbdnb.jpg'
													className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
												/>
												<div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
											</div>
										</div>
										<div className='w-44 flex-none space-y-8 pt-32 sm:pt-0 p-4'>
											<div className='relative'>
												<img
													alt='apple in hand'
													src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749290648/apple_in_hand_g40ioo.jpg'
													className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
												/>
												<div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
											</div>
											<div className='relative'>
												<img
													alt='milk and glass'
													src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749291157/milk_and_glass_tall_umn85y.jpg'
													className='aspect-1/2 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
												/>
												<div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Content section */}
					<div className='mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8'>
						<div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
							<h2 className='text-4xl font-semibold tracking-tight  text-white sm:text-5xl'>
								Our mission
							</h2>
							<div className='mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row'>
								<div className='lg:w-full lg:max-w-2xl lg:flex-auto'>
									<p className='text-xl/8 text-white'>
										At Blueberry Dairy and Hickory Cove Orchards, our mission is
										to nourish people and planet through regenerative
										agriculture. We’re committed to producing wholesome,
										nutrient-dense food while preserving the natural beauty and
										health of our land. Every practice we follow is rooted in
										sustainability, stewardship, and a desire to leave the Earth
										better than we found it — for our children, our community,
										and all future generations.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Image section */}

					{/* Values section */}
					<div className='mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8'>
						<div className='mx-auto max-w-2xl lg:mx-0'>
							<h2 className='text-4xl font-semibold tracking-tight  text-white sm:text-5xl'>
								Our values
							</h2>
							<h3 className='text-lg text-white italic mt-2'>
								A life rooted in reverence for the land, guided by purpose, and
								lived in harmony with nature.
							</h3>
						</div>
						<dl className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
							{values.map((value) => (
								<div key={value.name}>
									<dt className='font-semibold text-white'>{value.name}</dt>
									<dd className='mt-1 text-white'>{value.description}</dd>
								</div>
							))}
						</dl>
					</div>

					{/* Logo cloud */}
					<div className='relative isolate -z-10 mt-32 sm:mt-48'></div>

					{/* Farm Story Section */}
					<div className='mx-auto mt-32 max-w-7xl px-6 text-white text-start'>
						<h2 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl mb-8'>
							Our Farm Story
						</h2>

						<p className=' text-white text-xl text-start mb-6'>
							When we retired from busy careers in medicine in 2015, it was a
							wonderful opportunity to pursue a lifelong dream of full-time
							farming. Both of us are inveterate gardeners and looked forward to
							the less stressful life on a small farm in the country.
						</p>

						<p className='text-white text-lg leading-relaxed mb-6'>
							The idea of operating a commercial sized orchard and integrated
							farm evolved gradually, starting with a few apple trees expanding
							to three orchards with over 100 apple and pear trees, and a
							one-acre blueberry orchard.
						</p>

						<p className='text-white text-xl leading-relaxed mb-6'>
							Along with a love of growing things, we both have an abiding love
							and respect for animals. We started with a small flock of chickens
							which grew to over eighty hens and a small commercial egg
							business. In 2021 we added Nigerian Dwarf dairy goats with two
							bucks and two does, with plans to grow the herd gradually over
							several years.
						</p>

						<p className='text-white text-xl leading-relaxed mb-6'>
							Farming hasn't turned out to be quite as stress free as we had
							naively hoped. There are certainly challenges, especially for
							novice farmers. We anticipated surprises from weather and the many
							unknowns of the land itself, but there were some things we hadn't
							even considered.
							<a
								href='https://res.cloudinary.com/dzhweqopn/image/upload/v1749289459/deer_and_apples2_jb3oi4.jpg'
								target='_blank'
								rel='noopener noreferrer'
								className='block float-right w-88 max-w-full ml-6 mb-4'
							>
								<img
									src='https://res.cloudinary.com/dzhweqopn/image/upload/v1749289459/deer_and_apples2_jb3oi4.jpg'
									alt='Deer near apple trees at Blueberry Dairy'
									className='rounded shadow-md hover:opacity-90 transition'
								/>
								<span className='sr-only'>Click to view full-size image</span>
							</a>
							The deer in the photo at the bottom of the page are beautiful,
							frequent visitors on our farm, but when they chewed all the
							branches from our two-year-old apple trees, we had to add the wire
							cages to keep them off. A year or two later, when the trees were
							large enough to survive the deer browsing, and finally produce
							their first crop, bears broke several large branches to get the
							few half-ripe apples. Because they had no respect whatsoever for
							the wire cages, we installed an electric fence around the orchard.
							That worked well until a storm blew a tree down across the
							fence-line and flattened a whole row of fence. Any farmer knows
							that stories like this are common and just part of the business.
							It's been a wild, fascinating learning experience, which is part
							of the fun!
						</p>

						<p className='text-white text-xl leading-relaxed mb-6'>
							With all the challenges of farming in general, we frequently ask
							ourselves, "why add the complication of growing organic?" The
							answer isn't always easy to put into words. We believe that
							organic agricultural practices produce healthier, more nutritious
							food, and are better for people and the environment. We also like
							the idea of building healthy soil to produce healthy plants. That
							healthy soil will be part of our legacy to future generations.
							Agricultural land is disappearing at an alarming rate in America.
							What remains is rapidly becoming eroded by petrochemical
							industrial agricultural practices. It took eons to build that
							soil, it won't come back overnight, at least not without some
							help.
						</p>

						<p className=' text-white text-xl'>
							Despite all the challenges, or maybe because of them, we both love
							the opportunity to grow and raise healthy, chemical-free food for
							the local market and do our part to support a healthy ecosystem.
							We also thoroughly enjoy the chance to meet folks of like mind who
							appreciate the value of locally grown food and organic
							agriculture.
						</p>
					</div>

					{/* Inspiration Section */}
					{/* Inspiration Section */}
					<div className='mx-auto mt-32 max-w-4xl px-6 sm:mt-40 lg:px-8 text-center relative z-10'>
						<blockquote className='text-2xl sm:text-3xl md:text-4xl italic font-light leading-relaxed text-white'>
							“&nbsp;We don’t inherit the earth from our ancestors — we borrow
							it from our children.&nbsp;”
							<hr />
							“&nbsp;Only when the last tree has been cut down, the last fish
							been caught, and the last stream poisoned, will we realize we
							cannot eat money.&nbsp;”
						</blockquote>
						<p className='mt-4 text-gray-400 text-base italic'>
							— Native American Proverbs
						</p>
						<p className='mt-6 pb-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto'>
							At Blueberry Dairy and Hickory Cove Orchards, we believe farming
							is an act of hope — a way to leave the world better than we found
							it.
						</p>
					</div>
				</main>
			</div>
		</>
	);
}
