// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Updated to match the Express server
});

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Login failed. Invalid credentials.';
  }
};

export default api;
