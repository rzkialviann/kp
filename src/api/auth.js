import api from './axios';

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/login', { email, password });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error' };
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/api/users/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error' };
  }
};
