import API from './api';

export const loginUser = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return null;
  }
};
