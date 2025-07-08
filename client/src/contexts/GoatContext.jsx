/* eslint-disable react-refresh/only-export-components */
// @ts-nocheck
import { createContext, useReducer, useContext, useCallback } from 'react';
import {
	getAllGoats,
	getGoatById,
	createGoat,
	updateGoat,
	deleteGoat,
	getForSaleGoats,
	getDoes,
	getBucks,
} from '../services/goatService';

const GoatContext = createContext();

const initialState = {
	goats: [],
	goat: null,
	loading: false,
	error: null,
};

export const goatReducer = (state, action) => {
	switch (action.type) {
		case 'SET_LOADING':
			return { ...state, loading: true, error: null };
		case 'SET_GOATS':
			return { ...state, goats: action.payload, loading: false };
		case 'SET_GOAT':
			return { ...state, goat: action.payload, loading: false };
		case 'SET_ERROR':
			return { ...state, error: action.payload, loading: false };
		case 'CLEAR_GOAT':
			return { ...state, goat: null };
		default:
			return state;
	}
};

export const GoatProvider = ({ children }) => {
	const [state, dispatch] = useReducer(goatReducer, initialState);

	const fetchGoats = useCallback(async () => {
		dispatch({ type: 'SET_LOADING' });
		try {
			const data = await getAllGoats();
			dispatch({ type: 'SET_GOATS', payload: data });
		} catch (err) {
			dispatch({ type: 'SET_ERROR', payload: err.message });
		}
	}, []);

	const fetchGoatById = useCallback(async (id) => {
		dispatch({ type: 'SET_LOADING' });
		try {
			const data = await getGoatById(id);
			dispatch({ type: 'SET_GOAT', payload: data });
		} catch (err) {
			dispatch({ type: 'SET_ERROR', payload: err.message });
		}
	}, []);

	const fetchForSaleGoats = useCallback(async () => {
		dispatch({ type: 'SET_LOADING' });
		try {
			const data = await getForSaleGoats();
			dispatch({ type: 'SET_GOATS', payload: data });
		} catch (err) {
			dispatch({ type: 'SET_ERROR', payload: err.message });
		}
	}, []);

	const fetchDoes = useCallback(async () => {
		dispatch({ type: 'SET_LOADING' });
		try {
			const data = await getDoes();
			dispatch({ type: 'SET_GOATS', payload: data });
		} catch (err) {
			dispatch({ type: 'SET_ERROR', payload: err.message });
		}
	}, []);

	const fetchBucks = useCallback(async () => {
		dispatch({ type: 'SET_LOADING' });
		try {
			const data = await getBucks();
			dispatch({ type: 'SET_GOATS', payload: data });
		} catch (err) {
			dispatch({ type: 'SET_ERROR', payload: err.message });
		}
	}, []);

	return (
		<GoatContext.Provider
			value={{
				state,
				dispatch,
				fetchGoats,
				fetchGoatById,
				createGoat,
				updateGoat,
				deleteGoat,
				fetchForSaleGoats,
				fetchDoes,
				fetchBucks,
			}}
		>
			{children}
		</GoatContext.Provider>
	);
};

export const useGoatContext = () => useContext(GoatContext);
