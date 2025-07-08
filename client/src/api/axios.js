// @ts-nocheck
// client/src/api/axios.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (import.meta.env.MODE === 'development') {
	console.log('🔧 Axios Base URL (DEV):', baseURL);
}

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});
console.log('📦 Axios is using baseURL:', baseURL);

axiosInstance.interceptors.request.use((config) => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const token = storedUser?.token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;
