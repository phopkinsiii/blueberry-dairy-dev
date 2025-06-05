/* eslint-disable react-refresh/only-export-components */
//@ts-nocheck

import React, { createContext, useReducer, useContext } from 'react';
import axiosInstance from '../api/axios.js';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	company: '',
	subject: '',
	message: '',
	loading: false,
	error: null,
	submitted: false,
	successMessage: '', // New property to store the success message
};

const contactReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_FIELD':
			return { ...state, [action.field]: action.value };
		case 'SUBMIT_REQUEST':
			return { ...state, loading: true, error: null, successMessage: '' };
		case 'SUBMIT_SUCCESS':
			// Reset the form and store a success message:
			return {
				...initialState,
				submitted: true,
				successMessage: action.payload,
				loading: false,
			};
		case 'SUBMIT_FAILURE':
			return { ...state, loading: false, errorMessage: action.payload };
		case 'RESET_FORM':
			return initialState;
		default:
			return state;
	}
};

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
	const [state, dispatch] = useReducer(contactReducer, initialState);

	//Function to submit the contact form to the backend
	const submitContactForm = async (formData) => {
		dispatch({ type: 'SUBMIT_REQUEST' }); // handles loading + clears messages

		try {
			const { data } = await axiosInstance.post('/contacts', formData); // ✅ make sure this matches your route (/contacts is the correct route.)
			dispatch({ type: 'SUBMIT_SUCCESS', payload: data.message });
		} catch (error) {
			const message =
				error.response?.data?.message ||
				'Something went wrong. Please try again.';
			dispatch({ type: 'SUBMIT_FAILURE', payload: message });
		}
	};
	return (
		<ContactContext.Provider value={{ state, dispatch, submitContactForm }}>
			{children}
		</ContactContext.Provider>
	);
};

export const useContactContext = () => useContext(ContactContext);
