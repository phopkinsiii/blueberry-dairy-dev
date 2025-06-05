import { useEffect } from 'react';
import { useProductContext } from '../../contexts/ProductContext.jsx';
import ProductCard from './ProductCard.jsx';
import Spinner from '../../components/Spinner.jsx';
import SeoHead from '../../components/SeoHead.jsx';

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

	return (
		<>
			{/* SEO Metadata */}
			<SeoHead
				title='Our Farm Products | Blueberry Dairy'
				description='Browse organic farm products including raw goat milk, cheese, yogurt, apples, blueberries, and more from Blueberry Dairy.'
				url='https://www.blueberrydairy.com/products'
			/>
			<div
				className='bg-gray-100 py-12'
				style={{ fontFamily: 'Poppins, sans-serif' }}
			>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-4xl font-bold mb-8 text-center text-gray-800'>
						Shop Our Products
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
						{products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductList;
