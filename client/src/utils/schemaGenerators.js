// @ts-nocheck
// src/utils/schemaGenerators.js
import { stripHtml, getDefaultImage } from './seoUtils';

export const getProductSchema = (product = {}) => {
	if (!product || !product.name) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		image: [product.imageSrc || getDefaultImage()],
		description: stripHtml(product.description || ''),
		brand: {
			'@type': 'Organization',
			name: 'Blueberry Dairy',
		},
		offers: {
			'@type': 'Offer',
			url: `https://www.blueberrydairy.com/products/${product._id}`,
			priceCurrency: 'USD',
			price: product.priceOptions?.[0]?.price?.toFixed(2) || '0.00',
			availability:
				product.stock > 0
					? 'https://schema.org/InStock'
					: 'https://schema.org/OutOfStock',
			itemCondition: 'https://schema.org/NewCondition',
		},
	};
};

export const getBlogSchema = (post) => {
	if (!post) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: stripHtml(post.content)?.slice(0, 160),
		image: post.image || getDefaultImage(),
		author: {
			'@type': 'Person',
			name: post.author?.name || 'Blueberry Dairy',
		},
		datePublished: post.createdAt,
		dateModified: post.updatedAt || post.createdAt,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://www.blueberrydairy.com/blog/${post._id}`,
		},
	};
};

// utils/schemaGenerators.js

export const getWebSiteSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: 'Blueberry Dairy',
	url: 'https://www.blueberrydairy.com',
	potentialAction: {
		'@type': 'SearchAction',
		target: 'https://www.blueberrydairy.com/search?q={search_term_string}',
		'query-input': 'required name=search_term_string',
	},
});

export const getOrganizationSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Blueberry Dairy',
	url: 'https://www.blueberrydairy.com',
	logo: 'https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png',
	description:
		'Blueberry Dairy is a regenerative farm in Tennessee offering raw goat milk, organic fruit, and sustainable, nourishing food.',
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'East Tennessee',
		addressRegion: 'TN',
		addressCountry: 'USA',
	},
	sameAs: [
		'https://www.facebook.com/blueberrydairy', // Update or remove if unused
		'https://www.instagram.com/blueberrydairy',
	],
});

export const getForumSchema = (post) => {
	if (!post) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'DiscussionForumPosting',
		headline: post.title,
		description: stripHtml(post.content)?.slice(0, 160),
		image: post.image || getDefaultImage(),
		author: {
			'@type': 'Person',
			name: post.author?.name || 'Anonymous',
		},
		datePublished: post.createdAt,
		dateModified: post.updatedAt || post.createdAt,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://www.blueberrydairy.com/forum/${post._id}`,
		},
	};
};

export const getContactPageSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'ContactPage',
	name: 'Contact Us | Blueberry Dairy',
	url: 'https://www.blueberrydairy.com/contact',
	description:
		'Reach out to Blueberry Dairy with questions about raw goat milk, farm pickups, or local deliveries.',
	mainEntity: {
		'@type': 'LocalBusiness',
		name: 'Blueberry Dairy at Hickory Cove Orchards',
		image:
			'https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '154 Pressmens Home Road',
			addressLocality: 'Rogersville',
			addressRegion: 'TN',
			postalCode: '37857',
			addressCountry: 'US',
		},
		telephone: '+1-423-293-4487',
		email: 'hello@blueberrydairy.com',
		url: 'https://www.blueberrydairy.com',
		sameAs: [
			'https://www.facebook.com/blueberrydairy', // update or remove as needed
			'https://www.instagram.com/blueberrydairy', // update or remove as needed
		],
	},
});

export const getGoatSchema = (goat) => {
	if (!goat) return null;

	const pedigree = [
		{ name: 'Sire', value: goat.sire },
		{ name: 'Sire’s Sire', value: goat.sireSire },
		{ name: 'Sire’s Dam', value: goat.sireDam },
		{ name: 'Dam', value: goat.dam },
		{ name: 'Dam’s Sire', value: goat.damSire },
		{ name: 'Dam’s Dam', value: goat.damDam },
	].filter((p) => p.value);

	return {
		'@context': 'https://schema.org',
		'@type': 'IndividualProduct',
		name: `${goat.nickname} — Nigerian Dwarf ${goat.gender}`,
		alternateName: goat.registeredName,
		productID: goat.adgaId,
		description:
			goat.additionalInfo ||
			'Nigerian Dwarf dairy goat with full pedigree and health info.',
		url: `https://www.blueberrydairy.com/goats/${goat._id}`,
		brand: {
			'@type': 'Organization',
			name: 'Blueberry Dairy Goats',
		},
		sku: goat.adgaId,
		offers: {
			'@type': 'Offer',
			priceCurrency: 'USD',
			price: goat.price || '0.00',
			availability: 'https://schema.org/InStock',
			seller: {
				'@type': 'Organization',
				name: 'Blueberry Dairy',
				email: 'phopkins1757@gmail.com',
				telephone: '(423) 293-4487',
			},
		},
		additionalProperty: [
			{ '@type': 'PropertyValue', name: 'Date of Birth', value: goat.dob },
			{ '@type': 'PropertyValue', name: 'Gender', value: goat.gender },
			{
				'@type': 'PropertyValue',
				name: 'DNA Confirmed',
				value: goat.dnaConfirmed ? 'Yes' : 'No',
			},
			{
				'@type': 'PropertyValue',
				name: 'Disbudded',
				value: goat.disbudded ? 'Yes' : 'No',
			},
			...(goat.additionalInfo?.includes('wether')
				? [
						{
							'@type': 'PropertyValue',
							name: 'Wethering Option',
							value: 'Available for $50 extra',
						},
				  ]
				: []),
			...pedigree.map((p) => ({
				'@type': 'PropertyValue',
				name: p.name,
				value: p.value,
			})),
		],
	};
};

export const getBlogPageSchema = (posts = []) => ({
	'@context': 'https://schema.org',
	'@type': 'Blog',
	name: 'Blueberry Blog',
	url: 'https://www.blueberrydairy.com/blog',
	description:
		'Explore farm stories, seasonal insights, and goat care wisdom from Blueberry Dairy in East Tennessee.',
	blogPost: posts.map((post) => ({
		'@type': 'BlogPosting',
		headline: post.title,
		url: `https://www.blueberrydairy.com/blog/${post._id}`,
		datePublished: post.createdAt,
		image: post.image || 'https://www.blueberrydairy.com/default-image.jpg',
		author: {
			'@type': 'Person',
			name: post.author?.name || 'Blueberry Dairy',
		},
	})),
});

export const getGoatListSchema = (
	goats = [],
	pageTitle = 'Our Goats',
	url = ''
) => ({
	'@context': 'https://schema.org',
	'@type': 'CollectionPage',
	name: pageTitle,
	description: `View ${pageTitle} from Blueberry Dairy.`,
	url,
	mainEntity: goats.map((goat) => ({
		'@type': 'IndividualProduct',
		name: goat.nickname || goat.registeredName,
		url: `https://www.blueberrydairy.com/goats/${goat._id}`,
		identifier: goat.adgaId,
		additionalProperty: [
			{ '@type': 'PropertyValue', name: 'Gender', value: goat.gender },
			{
				'@type': 'PropertyValue',
				name: 'Date of Birth',
				value: new Date(goat.dob).toISOString().split('T')[0],
			},
		],
	})),
});

// schemaGenerators.js

export const getMilkRecordsSchema = (records = []) => ({
	'@context': 'https://schema.org',
	'@type': 'Dataset',
	name: 'Milk Production Records',
	description:
		'Daily milk yield records from Nigerian Dwarf dairy goats at Blueberry Dairy in Tennessee. Data includes production by date and goat.',
	url: 'https://www.blueberrydairy.com/milk-records',
	creator: {
		'@type': 'Organization',
		name: 'Blueberry Dairy',
		url: 'https://www.blueberrydairy.com',
	},
	license: 'https://www.blueberrydairy.com/terms',
	datasetTimeInterval: {
		'@type': 'DateTimeInterval',
		startDate:
			records.length > 0
				? new Date(
						Math.min(...records.map((r) => new Date(r.recordedAt)))
				  ).toISOString()
				: undefined,
		endDate:
			records.length > 0
				? new Date(
						Math.max(...records.map((r) => new Date(r.recordedAt)))
				  ).toISOString()
				: undefined,
	},
	variableMeasured: [
		{
			'@type': 'PropertyValue',
			name: 'Milk Weight',
			unitText: 'lb',
		},
	],
});
