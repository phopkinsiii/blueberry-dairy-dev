import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartContext } from '../../src/contexts/CartContext';

describe('CartContext', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
	});

	it('adds item to cart', () => {
		const { result } = renderHook(() => useCartContext(), { wrapper });

		act(() => {
			result.current.dispatch({
				type: 'ADD_ITEM',
				payload: { _id: '1', selectedSize: 'Large', price: 10, quantity: 2 },
			});
		});

		expect(result.current.cartItems).toHaveLength(1);
		expect(result.current.cartItems[0].quantity).toBe(2);
		expect(result.current.subtotal).toBe(20);
	});

	it('removes item from cart', () => {
		const { result } = renderHook(() => useCartContext(), { wrapper });

		act(() => {
			result.current.dispatch({
				type: 'ADD_ITEM',
				payload: { _id: '1', selectedSize: 'Large', price: 10 },
			});
		});

		act(() => {
			result.current.dispatch({
				type: 'REMOVE_ITEM',
				payload: { id: '1', selectedSize: 'Large' },
			});
		});

		expect(result.current.cartItems).toHaveLength(0);
	});

	it('updates item quantity', () => {
		const { result } = renderHook(() => useCartContext(), { wrapper });

		act(() => {
			result.current.dispatch({
				type: 'ADD_ITEM',
				payload: { _id: '1', selectedSize: 'Large', price: 10 },
			});
		});

		act(() => {
			result.current.dispatch({
				type: 'UPDATE_QUANTITY',
				payload: { id: '1', quantity: 5 },
			});
		});

		expect(result.current.cartItems[0].quantity).toBe(5);
		expect(result.current.subtotal).toBe(50);
	});

	it('clears cart', () => {
		const { result } = renderHook(() => useCartContext(), { wrapper });

		act(() => {
			result.current.dispatch({
				type: 'ADD_ITEM',
				payload: { _id: '1', selectedSize: 'Large', price: 10 },
			});
		});

		act(() => {
			result.current.dispatch({ type: 'CLEAR_CART' });
		});

		expect(result.current.cartItems).toHaveLength(0);
		expect(result.current.subtotal).toBe(0);
	});
});
