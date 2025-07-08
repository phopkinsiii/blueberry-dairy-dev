// src/api/testimonialApi.js
import axiosInstance from './axios';

export const fetchTestimonials = async () => {
	const { data } = await axiosInstance.get('/testimonials');
	return data;
};

export const submitTestimonial = async (testimonial) => {
	const { data } = await axiosInstance.post('/testimonials', testimonial);
	return data;
};

// Admin: Update testimonial
export const updateTestimonial = async (id, testimonial, token) => {
	console.log('Calling API to update testimonial...');
	console.log('Testimonial ID:', id);
	console.log('Payload:', testimonial);
	console.log('Token:', token);
	const { data } = await axiosInstance.put(`/testimonials/${id}`, testimonial, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
};

// Admin: Delete testimonial
export const deleteTestimonial = async (id, token) => {
	const { data } = await axiosInstance.delete(`/testimonials/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
};
