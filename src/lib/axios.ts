
import axios from 'axios';
import AuthService from '@/services/authService';

const API_URL = 'https://cydex-backend-production-edd3.up.railway.app';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getInstance().getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear auth state and redirect to login
      AuthService.getInstance().logout();
      window.location.href = '/auth';
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error);
      return Promise.reject(new Error('Unable to connect to the server. Please check your internet connection.'));
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
