// @ts-nocheck
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../contexts/ProductContext.jsx';
import ProductCard from './ProductCard.jsx';
import Spinner from '../../components/Spinner.jsx';
import AnimatedBackgroundWrapper from '../../components/layouts/AnimatedBackgroundWrapper.jsx';
import SeoHead from '../../components/SeoHead.jsx';
import {
	truncate,
	stripHtml,
	extractKeywords,
	getDefaultImage,
	getSeoTimestamps,
} from '../../utils/seoUtils';
import Footer from '../../components/Footer.jsx';
import SaleGoatsCard from '../../components/goats/SaleGoatsCard.jsx';

const ProductList = () => {
	const { state, fetchProducts } = useProductContext();
	const { products, loading, error } = state;

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return (
			<div className='text-center text-red-500 py-20 text-xl'>{error}</div>
		);
	}
	const { createdAt, updatedAt } = getSeoTimestamps(products);

	return (
		<>
			{/* SEO Metadata */}
			<SeoHead
				title='Our Farm Products | Blueberry Dairy'
				description={truncate(
					stripHtml(
						'Browse organic farm products including raw goat milk, cheese, yogurt, apples, blueberries, and more from Blueberry Dairy.'
					),
					160
				)}
				image={getDefaultImage()}
				url='https://www.blueberrydairy.com/products'
				keywords={extractKeywords(
					'goat milk cheese yogurt apples blueberries organic raw dairy farm products'
				)}
				createdAt={createdAt}
				updatedAt={updatedAt}
			/>

			<AnimatedBackgroundWrapper
				backgroundImageUrl='https://res.cloudinary.com/dzhweqopn/image/upload/v1750103669/river_bridge_high_okfqlf.jpg'
				blurAmount={8}
				brightness={90}
				animation='animate-zoom-in-once'
			>
				<div style={{ fontFamily: 'Poppins, sans-serif' }}>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<h1 className='text-6xl font-bold mb-8 text-center text-black text-shadow-bold'>
							Shop Our Products
						</h1>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
							{/* 🔗 Goat For Sale Card */}
							<SaleGoatsCard />
							{products.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
						</div>
					</div>
				</div>
			</AnimatedBackgroundWrapper>
		</>
	);
};

export default ProductList;
