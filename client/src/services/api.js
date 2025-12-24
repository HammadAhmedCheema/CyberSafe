import axios from 'axios';

// Define API URL from environment variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
export const IMAGE_BASE_URL = API_URL.replace('/api', '');

// Create an axios instance
const api = axios.create({
    baseURL: API_URL, // Point to our Express backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the JWT token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
