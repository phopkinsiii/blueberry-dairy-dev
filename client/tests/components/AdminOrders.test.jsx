// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ Enables .toBeInTheDocument
import AdminOrders from '../../src/pages/admin/products/AdminOrders.jsx';
import axiosInstance from '../../src/api/axios';
import { vi } from 'vitest';

// ✅ Mock axios with correct default export
vi.mock('../../src/api/axios', () => ({
  default: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

// ✅ Mock ProductContext
vi.mock('../../src/contexts/ProductContext.jsx', () => ({
  useProductContext: () => ({
    state: { products: [{ name: 'Milk' }] },
    fetchProducts: vi.fn(),
  }),
}));

const dummyOrders = [
  {
    _id: '1',
    pickupName: 'John Doe',
    pickupLocation: 'Farm Stand',
    pickupTime: '2025-07-06T14:00:00Z',
    fulfilled: false,
    cartItems: [{ name: 'Milk', quantity: 2, price: 10, size: '1/2 gal' }],
  },
];

describe('AdminOrders', () => {
  beforeEach(() => {
    axiosInstance.get.mockImplementation((url) => {
      if (url === '/orders') {
        return Promise.resolve({ data: dummyOrders });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  it('renders orders after loading', async () => {
    render(<AdminOrders />);
    expect(screen.getByText(/loading orders/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
      expect(screen.getByText(/farm stand/i)).toBeInTheDocument();
    });
  });

  it('opens filter modal when clicking TooltipIconButton', async () => {
    render(<AdminOrders />);
    await waitFor(() => screen.getByText(/john doe/i));

    // ✅ Select first button (your TooltipIconButton, the filter button)
    const buttons = screen.getAllByRole('button');
    const filterButton = buttons[0];
    fireEvent.click(filterButton);

    await waitFor(() => {
      // You can also mock OrderFiltersModal if needed.
      expect(screen.getByText(/apply filters/i)).toBeInTheDocument();
    });
  });

  it('toggles fulfillment status', async () => {
    axiosInstance.patch.mockResolvedValueOnce({ data: { isFulfilled: true } });

    render(<AdminOrders />);
    await waitFor(() => screen.getByText(/pending/i));

    const statusButton = screen.getByText(/pending/i);
    fireEvent.click(statusButton);

    await waitFor(() => {
      expect(axiosInstance.patch).toHaveBeenCalled();
    });
  });
});
