// components/SeoHead.jsx
import { Title, Meta, Link as HeadLink } from 'react-head';
import { getDefaultImage } from '../utils/seoUtils';

const SeoHead = ({
	title = '',
	description = '',
	image,
	url = 'https://www.blueberrydairy.com',
	keywords,
	createdAt,
	updatedAt,
}) => {
	const imageUrl = image || getDefaultImage();

	if (!title || !description || !url) return null;

	return (
		<>
			<Title>{title}</Title>
			<Meta name='description' content={description} />
			{keywords && <Meta name='keywords' content={keywords} />}
			<Meta property='og:title' content={title} />
			<Meta property='og:description' content={description} />
			<Meta property='og:image' content={imageUrl} />
			<Meta property='og:url' content={url} />
			<Meta property='og:type' content='website' />
			<Meta name='twitter:card' content='summary_large_image' />
			<Meta name='twitter:title' content={title} />
			<Meta name='twitter:description' content={description} />
			<Meta name='twitter:image' content={imageUrl} />
			<HeadLink rel='canonical' href={url} />
		</>
	);
};

export default SeoHead;
