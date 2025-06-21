import axiosInstance from '../api/axios';

export const getAllGoats = async () => {
  const res = await axiosInstance.get('/goats');
  return res.data;
};

export const getGoatById = async (id) => {
  const res = await axiosInstance.get(`/goats/${id}`);
  return res.data;
};

export const createGoat = async (formData, token) => {
  const res = await axiosInstance.post('/goats', formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateGoat = async (id, formData, token) => {
  const res = await axiosInstance.put(`/goats/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteGoat = async (id, token) => {
  const res = await axiosInstance.delete(`/goats/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getForSaleGoats = async () => {
	const res = await axiosInstance.get('/goats/for-sale');
	return res.data;
};

export const getDoes = async () => {
	const res = await axiosInstance.get('/goats/does');
	return res.data;
};

export const getBucks = async () => {
  const res = await axiosInstance.get('/goats/bucks')
  return res.data;
}
