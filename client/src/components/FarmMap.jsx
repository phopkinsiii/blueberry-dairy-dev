import { useState } from 'react';

const FarmMap = () => {
	const [activeTab, setActiveTab] = useState('map');

	return (
		<div className='w-full bg-gray-100 py-10 px-4'>
			<h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
				Find Blueberry Dairy
			</h2>

			{/* Tab Buttons */}
			<div className='flex justify-center space-x-4 mb-6'>
				<button
					onClick={() => setActiveTab('map')}
					className={`px-6 py-2 rounded-md font-medium ${
						activeTab === 'map'
							? 'bg-indigo-600 text-white'
							: 'bg-white text-gray-700 border border-gray-300'
					}`}
				>
					Map
				</button>
				<button
					onClick={() => setActiveTab('street')}
					className={`px-6 py-2 rounded-md font-medium ${
						activeTab === 'street'
							? 'bg-indigo-600 text-white'
							: 'bg-white text-gray-700 border border-gray-300'
					}`}
				>
					Street View
				</button>
			</div>

			{/* Tab Content */}
			<div className='w-full max-w-8xl h-[500px] sm:h-[600px] lg:h-[700px] mx-auto shadow-lg ring-1 ring-gray-200 rounded-md overflow-hidden transition-all duration-300'>
				{activeTab === 'map' && (
					<iframe
						title='Blueberry Dairy Map'
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51364.11933782449!2d-83.14769963294222!3d36.42715677235585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885b083950932e01%3A0x744c741dad1699f7!2s154%20Pressmens%20Home%20Rd%2C%20Rogersville%2C%20TN%2037857!5e0!3m2!1sen!2sus!4v1747415815227!5m2!1sen!2sus'
						width='100%'
						height='100%'
						style={{ border: 0 }}
						allowFullScreen=''
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					></iframe>
				)}

				{activeTab === 'street' && (
					<iframe
						title='Blueberry Dairy Street View'
						src='https://www.google.com/maps/embed?pb=!4v1747394085270!6m8!1m7!1suINadJisaEH4OmX2cLh33w!2m2!1d36.42764234463888!2d-83.10720720500083!3f185.38163418805075!4f4.825890479602663!5f0.4000000000000002'
						width='100%'
						height='100%'
						style={{ border: 0 }}
						allowFullScreen=''
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					></iframe>
				)}
			</div>
		</div>
	);
};

export default FarmMap;
