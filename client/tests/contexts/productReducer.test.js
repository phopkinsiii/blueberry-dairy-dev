import { describe, it, expect } from 'vitest';
import { productReducer } from '../../src/contexts/ProductContext';

describe('productReducer', () => {
	it('handles SET_LOADING', () => {
		const initialState = { loading: false };
		const action = { type: 'SET_LOADING', payload: true };
		const newState = productReducer(initialState, action);
		expect(newState.loading).toBe(true);
	});

	it('handles SET_PRODUCTS', () => {
		const initialState = { products: [], loading: true, error: null };
		const action = {
			type: 'SET_PRODUCTS',
			payload: [{ _id: '1', name: 'Milk' }],
		};
		const newState = productReducer(initialState, action);
		expect(newState.products).toEqual([{ _id: '1', name: 'Milk' }]);
		expect(newState.loading).toBe(false);
		expect(newState.error).toBeNull();
	});

	it('handles DELETE_PRODUCT', () => {
		const initialState = {
			products: [{ _id: '1' }, { _id: '2' }],
		};
		const action = { type: 'DELETE_PRODUCT', payload: '1' };
		const newState = productReducer(initialState, action);
		expect(newState.products).toEqual([{ _id: '2' }]);
	});

	it('handles UPDATE_PRODUCT_STOCK_SUCCESS', () => {
		const initialState = {
			products: [{ _id: '1', stock: 5 }],
		};
		const action = {
			type: 'UPDATE_PRODUCT_STOCK_SUCCESS',
			payload: { _id: '1', stock: 10 },
		};
		const newState = productReducer(initialState, action);
		expect(newState.products).toEqual([{ _id: '1', stock: 10 }]);
	});
});
