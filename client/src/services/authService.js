import axiosInstance from '../api/axios.js';

//Register User

export const registerUser = async (userData, dispatch) => {
  try {
    dispatch({ type: 'AUTH_REQUEST' });

    const response = await axiosInstance.post('/users/register', userData); // ✅ FIXED

    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'AUTH_FAILURE', payload: error.message });
    throw error;
  }
};


//Login User
export const loginUser = async (credentials, dispatch) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });

		const response = await axiosInstance.post('/users/login', credentials);
		dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
		return response.data;
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Request Failed',
		});
		throw error;
	}
};

//Request Password Reset

export const requestPasswordReset = async (email, dispatch) => {
	dispatch({ type: 'SET_LOADING', payload: true });
	try {
		const { data } = await axiosInstance.post('/users/request-password-reset', {
			email,
		});
		dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' });
		return data;
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Failed to send reset link',
		});
		throw error;
	}
};

export const resetPassword = async (resetToken, newPassword, dispatch) => {
	dispatch({ type: 'SET_LOADING', payload: true });
	try {
		const { data } = await axiosInstance.post('/users/reset-password', {
			resetToken,
			newPassword,
		});
		dispatch({ type: 'RESET_PASSWORD_SUCCESS' });
		return data;
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Failed to reset password',
		});
		throw error;
	}
};


//Set Admin Role (protected)
export const setAdminRole = async (userId, dispatch) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });
		await axiosInstance.put(`/set-admin/${userId}`);
		dispatch({ type: 'SET_LOADING', payload: false });
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Admin update failed',
		});
		throw error;
	}
};

//Get all Users (protected)
export const getAllUsers = async (dispatch) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });
		const response = await axiosInstance('/');
		dispatch({ type: 'SET_LOADING', payload: false });
		return response.data;
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Failed to fetch users',
		});
		throw error;
	}
};

//Logout User (clear context)
export const logoutUser = (dispatch) => {
	dispatch({ type: 'LOGOUT' });
};
