// src/components/SeoHead.jsx
// @ts-nocheck
import { Title, Meta, Link as HeadLink } from 'react-head';

const SeoHead = ({
	title = '',
	description = '',
	image = 'https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png',
	url = 'https://www.blueberrydairy.com',
	keywords, // ✅ Accept keywords as prop
}) => {
	// Early exit if essential metadata is missing
	if (!title || !description || !url) return null;

	return (
		<>
			<Title>{title}</Title>
			<Meta name='description' content={description} />
			{keywords && <Meta name='keywords' content={keywords} />}
			<Meta property='og:title' content={title} />
			<Meta property='og:description' content={description} />
			<Meta property='og:image' content={image} />
			<Meta property='og:url' content={url} />
			<Meta property='og:type' content='website' />

			<Meta name='twitter:card' content='summary_large_image' />
			<Meta name='twitter:title' content={title} />
			<Meta name='twitter:description' content={description} />
			<Meta name='twitter:image' content={image} />

			{/* Optional: Add LinkedIn metadata */}
			<Meta property='linkedin:title' content={title} />
			<Meta property='linkedin:description' content={description} />
			<Meta property='linkedin:image' content={image} />

			<HeadLink rel='canonical' href={url} />
		</>
	);
};

export default SeoHead;
