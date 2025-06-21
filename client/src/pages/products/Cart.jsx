// @ts-nocheck
import { Link } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Cart = () => {
	const { cartItems, dispatch, subtotal } = useCartContext();

	const handleQuantityChange = (id, size, newQty) => {
		if (newQty <= 0) {
			const confirmed = window.confirm('Remove this item from the cart?');
			if (confirmed) {
				dispatch({ type: 'REMOVE_ITEM', payload: { id, selectedSize: size } });
			}
		} else {
			dispatch({
				type: 'UPDATE_QUANTITY',
				payload: { id, selectedSize: size, quantity: newQty },
			});
		}
	};

	const handleClearCart = () => {
		if (window.confirm('Are you sure you want to clear your cart?')) {
			dispatch({ type: 'CLEAR_CART' });
		}
	};

	const shortDescription = (desc) => {
		if (!desc) return '';
		const sentences = desc.split('.').filter(Boolean);
		return (
			sentences.slice(0, 1).join('. ') + (sentences.length > 1 ? '...' : '.')
		);
	};

	return (
		<div className='bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
			<h1 className='text-3xl font-bold tracking-tight text-gray-900 mb-8'>
				Shopping Cart
			</h1>

			{cartItems.length === 0 ? (
				<p className='text-gray-500 text-lg'>Your cart is empty.</p>
			) : (
				<form className='lg:grid lg:grid-cols-12 lg:gap-x-12'>
					{/* Cart Items */}
					<section className='lg:col-span-7'>
						<ul className='divide-y divide-gray-200 border-t border-b border-gray-200'>
							{cartItems.map((product, idx) => (
								<li
									key={`${product._id}-${product.selectedSize}`}
									className='flex py-6 sm:py-10'
								>
									<img
										src={product.imageSrc}
										alt={product.imageAlt || product.name}
										className='h-24 w-24 sm:h-48 sm:w-48 object-cover rounded-md'
									/>
									<div className='ml-4 flex-1 flex flex-col justify-between sm:ml-6'>
										<div className='sm:flex sm:justify-between'>
											<div>
												<h3 className='text-lg font-medium text-gray-900'>
													{product.name}
												</h3>
												<p className='text-sm text-gray-500'>
													{shortDescription(product.description)}
												</p>
												<p className='text-sm text-gray-700 mt-1'>
													<span className='font-semibold'>Size:</span>{' '}
													{product.selectedSize}
												</p>
												<p className='text-sm text-gray-700'>
													<span className='font-semibold'>Unit Price:</span> $
													{product.price.toFixed(2)}
												</p>
											</div>
											<p className='text-lg font-semibold text-gray-900 mt-2 sm:mt-0'>
												${(product.price * product.quantity).toFixed(2)}
											</p>
										</div>

										<div className='mt-4 flex items-center justify-between sm:mt-0'>
											<div className='flex items-center space-x-2'>
												<button
													onClick={() =>
														handleQuantityChange(
															product._id,
															product.selectedSize,
															product.quantity - 1
														)
													}
													className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
												>
													−
												</button>
												<span className='px-3'>{product.quantity}</span>
												<button
													onClick={() =>
														handleQuantityChange(
															product._id,
															product.selectedSize,
															product.quantity + 1
														)
													}
													className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
												>
													+
												</button>
											</div>

											<button
												type='button'
												onClick={() =>
													dispatch({
														type: 'REMOVE_ITEM',
														payload: {
															id: product._id,
															selectedSize: product.selectedSize,
														},
													})
												}
												className='text-red-600 hover:text-red-800 ml-4'
											>
												<XMarkIcon className='w-5 h-5' />
												<span className='sr-only'>Remove</span>
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>

						<button
							type='button'
							onClick={handleClearCart}
							className='mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition'
						>
							Clear Cart
						</button>
					</section>

					{/* Order Summary */}
					<section className='mt-10 lg:mt-0 lg:col-span-5'>
						<div className='bg-gray-50 p-6 rounded-lg shadow-sm'>
							<h2 className='text-lg font-medium text-gray-900 mb-4'>
								Order Summary
							</h2>
							<div className='flex justify-between text-base text-gray-700'>
								<p>Total</p>
								<p>${subtotal.toFixed(2)}</p>
							</div>
							<Link
								to='/checkout'
								className='block mt-6 w-full text-center bg-indigo-600 text-white font-medium py-3 px-4 rounded-md hover:bg-indigo-700'
							>
								Checkout
							</Link>
						</div>
					</section>
				</form>
			)}
		</div>
	);
};

export default Cart;
