import { describe, it, expect } from 'vitest';
import { goatReducer } from '../../src/contexts/GoatContext';

describe('goatReducer', () => {
  const initialState = {
    goats: [],
    goat: null,
    loading: false,
    error: null,
  };

  it('should set loading state', () => {
    const action = { type: 'SET_LOADING' };
    const result = goatReducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBe(null);
  });

  it('should set goats list', () => {
    const goats = [{ id: 1, name: 'Rico' }];
    const action = { type: 'SET_GOATS', payload: goats };
    const result = goatReducer(initialState, action);
    expect(result.goats).toEqual(goats);
    expect(result.loading).toBe(false);
  });

  it('should set single goat', () => {
    const goat = { id: 1, name: 'Rico' };
    const action = { type: 'SET_GOAT', payload: goat };
    const result = goatReducer(initialState, action);
    expect(result.goat).toEqual(goat);
    expect(result.loading).toBe(false);
  });

  it('should set error', () => {
    const error = 'Something went wrong';
    const action = { type: 'SET_ERROR', payload: error };
    const result = goatReducer(initialState, action);
    expect(result.error).toBe(error);
    expect(result.loading).toBe(false);
  });

  it('should clear goat', () => {
    const action = { type: 'CLEAR_GOAT' };
    const result = goatReducer(
      { ...initialState, goat: { id: 1, name: 'Rico' } },
      action
    );
    expect(result.goat).toBe(null);
  });

  it('should return current state for unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const result = goatReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
