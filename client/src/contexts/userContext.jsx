/* eslint-disable react-refresh/only-export-components */
// @ts-nocheck
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialUserState = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	role: JSON.parse(localStorage.getItem('role')) || null,
	loading: false,
	error: null,
};

const userReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			localStorage.setItem('user', JSON.stringify(action.payload));
			localStorage.setItem('role', JSON.stringify(action.payload.role));
			return {
				...state,
				user: action.payload,
				role: action.payload.role,
				loading: false,
				error: null,
			};
		case 'LOGOUT':
			localStorage.removeItem('user');
			localStorage.removeItem('role');
			return { ...state, user: null, role: null };
		case 'SET_LOADING':
			return { ...state, loading: action.payload };
		case 'SET_ERROR':
			return { ...state, error: action.payload, loading: false };
		case 'RESET_REQUEST_START':
			return { ...state, loading: true, error: null };
		case 'RESET_REQUEST_SUCCESS':
			return { ...state, loading: false, error: null };
		case 'RESET_REQUEST_FAILURE':
			return { ...state, loading: false, error: action.payload };
case 'AUTH_REQUEST':
	return { ...state, loading: true, error: null };

		default:
			return state;
	}
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialUserState);

	//Fetch stored user data when the app loads
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'));
		const storedRole = JSON.parse(localStorage.getItem('role'));

		console.log('Retrieved user from Local Storage: ', storedUser);
		console.log('Retrieved user role from Local Storage: ', storedRole);

		if (storedUser && storedRole) {
			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: { ...storedUser, role: storedRole },
			});
		}
	}, []);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
