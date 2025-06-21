// @ts-nocheck
import { useState } from 'react';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
	const { dispatch } = useCartContext();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selectedOption = product.priceOptions?.[selectedIndex];

	const handleAddToCart = () => {
		if (!selectedOption) return;

		dispatch({
			type: 'ADD_ITEM',
			payload: {
				...product,
				quantity: 1,
				price: selectedOption.price,
				selectedSize: selectedOption.size,
				selectedOption,
			},
		});

		toast.success(`${product.name} added to cart!`, {
			position: 'bottom-right',
			autoClose: 1200,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			theme: 'light',
			className: 'text-sm px-3 py-2 rounded shadow-md border border-green-200',
		});
	};

	return (
		<section>
			<div
				className='fade-in-grow bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col min-h-[580px] overflow-hidden'
				style={{ fontFamily: 'Poppins, sans-serif' }}
			>
				{product.imageSrc ? (
					<img
						src={product.imageSrc}
						alt={product.imageAlt || 'Product image'}
						loading='lazy'
						crossOrigin='anonymous'
						className='w-full h-64 object-cover rounded-t-xl'
					/>
				) : (
					<div className='w-full h-48 flex items-center justify-center bg-gray-100 text-gray-500'>
						No Image
					</div>
				)}

				<div className='flex flex-col flex-grow p-4'>
					<h3 className='text-lg font-semibold text-gray-900 mb-1 line-clamp-2'>
						{product.name}
					</h3>
					<p className='text-gray-700 text-sm line-clamp-3 mb-1'>
						{product.description}
					</p>
					<Link
						to={`/products/${product._id}`}
						className='text-blue-600 text-md hover:underline mt-1'
						onClick={(e) => e.stopPropagation()}
					>
						Read more ↪
					</Link>

					{product.priceOptions?.length > 0 && (
						<div className='mt-3'>
							<label className='block text-sm text-gray-600 mb-1'>
								Select size:
							</label>
							<select
								value={selectedIndex}
								onChange={(e) => setSelectedIndex(Number(e.target.value))}
								className='w-full border border-gray-300 rounded px-2 py-1 text-sm'
							>
								{product.priceOptions.map((option, index) => (
									<option key={index} value={index}>
										${option.price.toFixed(2)} per {option.size}
									</option>
								))}
							</select>
						</div>
					)}

					{/* Push button to bottom */}
					<div className='mt-auto pt-4'>
						<button
							onClick={() => handleAddToCart(product)}
							disabled={product.stock === 0}
							className={`w-full px-4 py-2 rounded text-white transition ${
								product.stock === 0
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-green-600 hover:bg-green-700'
							}`}
						>
							{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductCard;
