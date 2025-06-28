// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import Spinner from '../../components/Spinner';
import SeoHead from '../../components/SeoHead';
import {
	truncate,
	stripHtml,
	extractKeywords,
	getDefaultImage,
} from '../../utils/seoUtils';
import JsonLd from '../../components/JsonLd';
import { getGoatSchema } from '../../utils/schemaGenerators';

import { formatDate } from '../../utils/dateHelpers';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';

const GoatDetails = () => {
	const { id } = useParams();
	const [goat, setGoat] = useState(null);
	const [loading, setLoading] = useState(true);
	const [openLightbox, setOpenLightbox] = useState(false);

	useEffect(() => {
		const fetchGoat = async () => {
			try {
				const res = await axiosInstance.get(`/goats/${id}`);
				setGoat(res.data);
			} catch (err) {
				console.error('Failed to fetch goat:', err);
			} finally {
				setLoading(false);
			}
		};
		fetchGoat();
	}, [id]);

	if (loading) return <Spinner />;
	if (!goat)
		return (
			<div className='text-center text-red-600 py-10'>Goat not found.</div>
		);

	const {
		nickname,
		registeredName,
		dob,
		gender,
		adgaId,
		awards,
		pedigree,
		dnaConfirmed,
		forSale,
		price,
		additionalInfo,
		images = [], // Array of image URLs
	} = goat;

	const slides = goat.images?.map((url) => ({
		src: url,
		title: goat.nickname,
	}));

	return (
		<>
			<SeoHead
				title={`${nickname} | Nigerian Dwarf Goat at Blueberry Dairy`}
				alt={goat.nickname || 'Goat at Blueberry Dairy'}
				description={truncate(
					stripHtml(
						`Meet ${nickname}, a registered Nigerian Dwarf goat at Blueberry Dairy.`
					),
					160
				)}
				image={images?.[0] || getDefaultImage()}
				url={`https://www.blueberrydairy.com/goats/${id}`}
				keywords={extractKeywords(
					`${nickname} ${registeredName || ''} Nigerian Dwarf Goat`
				)}
				createdAt={goat.createdAt}
				updatedAt={goat.updatedAt}
			/>
			{goat && <JsonLd data={getGoatSchema(goat)} />}

			<div className='max-w-7xl mx-auto px-6 py-12'>
				<h1 className='text-4xl font-bold text-amber-900 mb-6'>{nickname}</h1>

				{images.length > 0 && (
					<>
						<div
							className='w-full cursor-pointer rounded overflow-hidden shadow-md'
							onClick={() => setOpenLightbox(true)}
						>
							<img
								src={goat.images?.[0] || '/images/goat_logo1.png'}
								alt={goat.nickname}
								className='w-full h-220 object-cover rounded-lg shadow-md'
								loading='lazy'
							/>
							<p className='text-md text-center text-gray-600 mt-2'>
								Click to view photo gallery
							</p>
						</div>

						<Lightbox
							open={openLightbox}
							close={() => setOpenLightbox(false)}
							slides={slides}
							plugins={[Thumbnails, Captions]}
						/>
					</>
				)}

				<div className='mt-8 space-y-4'>
					<p>
						<span className='font-semibold'>Registered Name:</span>{' '}
						{registeredName}
					</p>
					<p>
						<span className='font-semibold'>Date of Birth:</span>{' '}
						{formatDate(dob)}
					</p>

					<p>
						<span className='font-semibold'>Gender:</span> {gender}
					</p>

					<p>
						<span className='font-semibold'>ADGA ID:</span> {adgaId}
					</p>
					{Array.isArray(awards) && awards.some((a) => a.trim() !== '') && (
						<div>
							<p className='font-semibold'>Awards:</p>
							<ul className='list-disc list-inside'>
								{awards
									.filter((award) => award.trim() !== '')
									.map((award, idx) => (
										<li key={idx}>{award}</li>
									))}
							</ul>
						</div>
					)}

					<div>
						<p className='font-semibold mb-1'>Pedigree:</p>
						<ul className='list-disc list-inside text-sm'>
							<li>
								<strong>Sire:</strong> {pedigree?.sire}
							</li>
							<li>
								<strong>Sire’s Sire:</strong> {pedigree?.siresSire}
							</li>
							<li>
								<strong>Sire’s Dam:</strong> {pedigree?.siresDam}
							</li>
							<li>
								<strong>Dam:</strong> {pedigree?.dam}
							</li>
							<li>
								<strong>Dam’s Sire:</strong> {pedigree?.damsSire}
							</li>
							<li>
								<strong>Dam’s Dam:</strong> {pedigree?.damsDam}
							</li>
						</ul>
					</div>
					<p>
						<span className='font-semibold'>DNA Confirmed:</span>{' '}
						{dnaConfirmed ? 'Yes' : 'No'}
					</p>
					<p>
						<span className='font-semibold'>Disbudded:</span>{' '}
						{goat.disbudded ? 'Yes' : 'No'}
					</p>

					{forSale && (
						<>
							<p>
								<span className='font-semibold'>Price:</span> ${price}
							</p>
							<p>
								<span className='font-semibold'>More Info:</span>{' '}
								{additionalInfo}
							</p>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default GoatDetails;
