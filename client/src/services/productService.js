import axiosInstance from "../api/axios";

// src/services/productService.js

export const updateProductStock = async (productId, newStock) => {
	return axiosInstance.put(`/products/${productId}/stock`, { stock: newStock });
};
