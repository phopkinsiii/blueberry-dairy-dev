import {
	IconInfoCircle,
	IconBook,
	IconFlask,
	IconClipboardList,
	IconQuote,
	IconHeartHandshake,
} from '@tabler/icons-react';

export const farmLinks = [
	{ label: 'About the Farm', path: '/our-farm', icon: IconInfoCircle },
	{ label: 'Testimonials', path: '/testimonials', icon: IconHeartHandshake },
	{
		label: 'Farm Records',
		children: [
			{ label: 'Milk Records', path: '/milk-records' },
			{ label: 'Health Records', path: '/health-records' },
			{ label: 'Breeding Records', path: '/breeding-records' },
			// Add more as needed
		],
		icon: IconClipboardList,
	},
	{ label: 'Processes & SOPs', path: '/processes', icon: IconBook },
	{ label: 'Milk & Bacterial Testing', path: '/testing', icon: IconFlask },
];
