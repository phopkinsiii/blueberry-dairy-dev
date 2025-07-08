// tests/contexts/GoatContext.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { GoatProvider, useGoatContext } from '../../src/contexts/GoatContext';

// Mock the goatService functions
vi.mock('../../src/services/goatService', () => ({
  getAllGoats: vi.fn().mockResolvedValue([{ id: '1', nickname: 'Test Goat' }]),
  getGoatById: vi.fn().mockResolvedValue({ id: '1', nickname: 'Test Goat' }),
  createGoat: vi.fn(),
  updateGoat: vi.fn(),
  deleteGoat: vi.fn(),
  getForSaleGoats: vi.fn().mockResolvedValue([{ id: '2', nickname: 'Sale Goat' }]),
  getDoes: vi.fn().mockResolvedValue([{ id: '3', nickname: 'Doe Goat' }]),
  getBucks: vi.fn().mockResolvedValue([{ id: '4', nickname: 'Buck Goat' }]),
}));

describe('GoatContext', () => {
  let result;

  beforeEach(() => {
    const hook = renderHook(() => useGoatContext(), { wrapper: GoatProvider });
    result = hook.result;
  });

  it('fetches all goats', async () => {
    await act(() => result.current.fetchGoats());
    expect(result.current.state.goats).toEqual([{ id: '1', nickname: 'Test Goat' }]);
  });

  it('fetches a goat by ID', async () => {
    await act(() => result.current.fetchGoatById('1'));
    expect(result.current.state.goat).toEqual({ id: '1', nickname: 'Test Goat' });
  });

  it('fetches for-sale goats', async () => {
    await act(() => result.current.fetchForSaleGoats());
    expect(result.current.state.goats).toEqual([{ id: '2', nickname: 'Sale Goat' }]);
  });

  it('fetches does', async () => {
    await act(() => result.current.fetchDoes());
    expect(result.current.state.goats).toEqual([{ id: '3', nickname: 'Doe Goat' }]);
  });

  it('fetches bucks', async () => {
    await act(() => result.current.fetchBucks());
    expect(result.current.state.goats).toEqual([{ id: '4', nickname: 'Buck Goat' }]);
  });
});
