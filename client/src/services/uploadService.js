import axiosInstance from '../api/axios.js';

export const uploadImage = async(file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axiosInstance.post('/upload',
        formData, {
            headers: {
                'Content-Type': 'mulitpart/form-data',
            },
        });
        return response.data.imageUrl; 
}