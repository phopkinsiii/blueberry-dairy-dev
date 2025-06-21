// src/services/forumService.js
import axiosInstance from '../api/axios.js';

// Posts
export const getAllPosts = async () => {
	const response = await axiosInstance.get('/forum');
	return response.data;
};

export const createPost = async (post) => {
	const response = await axiosInstance.post('/forum', post);
	return response.data;
};

export const updatePost = async (id, updatedPost) => {
	const response = await axiosInstance.put(`/forum/${id}`, updatedPost);
	return response.data;
};

export const deletePost = async (id) => {
	const response = await axiosInstance.delete(`/forum/${id}`);
	return response.data;
};

// Replies
export const createReply = async (postId, reply) => {
	const response = await axiosInstance.post(`/forum/${postId}/replies`, reply);
	return response.data;
};

export const deleteReply = async (postId, replyId) => {
	const response = await axiosInstance.delete(
		`/forum/${postId}/replies/${replyId}`
	);
	return response.data;
};

export const getSinglePost = async (id) => {
	try {
		const response = await axiosInstance.get(`/forum/${id}`);
		return response.data;
	} catch (error) {
		console.error('❌ Error fetching single forum post:', error);
		throw error;
	}
};

// ✅ No token needed as it's injected automatically
export const getManageablePosts = async () => {
	const response = await axiosInstance.get('/forum/manage');
	return response.data;
};


