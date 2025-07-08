// @ts-nocheck
// tests/contexts/ProductContext.test.jsx
import { renderHook, act } from '@testing-library/react';
import {
	ProductProvider,
	useProductContext,
} from '../../src/contexts/ProductContext';
import axiosInstance from '../../src/api/axios';

// ✅ Mock axios
vi.mock('../../src/api/axios');

describe('ProductContext', () => {
	const wrapper = ({ children }) => (
		<ProductProvider>{children}</ProductProvider>
	);

	it('fetches products successfully', async () => {
		const dummyProducts = [{ _id: '1', name: 'Milk' }];
		axiosInstance.get.mockResolvedValueOnce({
			data: { products: dummyProducts },
		});

		const { result } = renderHook(() => useProductContext(), { wrapper });

		await act(async () => {
			await result.current.fetchProducts();
		});

		expect(result.current.state.products).toEqual(dummyProducts);
		expect(result.current.state.loading).toBe(false);
		expect(result.current.state.error).toBeNull();
	});

	it('handles fetch product errors', async () => {
		axiosInstance.get.mockRejectedValueOnce(new Error('Network error'));

		const { result } = renderHook(() => useProductContext(), { wrapper });

		await act(async () => {
			await result.current.fetchProducts();
		});

		expect(result.current.state.error).toBe('Network error');
		expect(result.current.state.loading).toBe(false);
	});

	it('deletes a product successfully', async () => {
		const dummyProducts = [
			{ _id: '1', name: 'Milk' },
			{ _id: '2', name: 'Cheese' },
		];
		axiosInstance.get.mockResolvedValueOnce({
			data: { products: dummyProducts },
		});

		const { result } = renderHook(() => useProductContext(), { wrapper });

		await act(async () => {
			await result.current.fetchProducts();
		});

		axiosInstance.delete.mockResolvedValueOnce({});
		await act(async () => {
			await result.current.deleteProduct('1', 'dummy-token');
		});

		expect(result.current.state.products).toEqual([
			{ _id: '2', name: 'Cheese' },
		]);
	});

it('updates product stock successfully', async () => {
	const updatedProduct = { _id: '1', name: 'Milk', stock: 20 };
	axiosInstance.patch.mockResolvedValueOnce({ data: { product: updatedProduct } });

	const { result } = renderHook(() => useProductContext(), { wrapper });

	// Set initial products to include the product we want to update
	act(() => {
		result.current.dispatch({
			type: 'SET_PRODUCTS',
			payload: [{ _id: '1', name: 'Milk', stock: 10 }],
		});
	});

	await act(async () => {
		await result.current.updateProductStock('1', { amountToAdd: 10 });
	});

	expect(result.current.state.products).toEqual(
		expect.arrayContaining([updatedProduct])
	);
});

});
