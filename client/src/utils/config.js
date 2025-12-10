// Get the base URL for the API (without /api suffix)
export const getBaseURL = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    // Remove /api suffix to get base URL
    return apiUrl.replace(/\/api$/, '');
};

// Get the API URL
export const getApiURL = () => {
    return import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
};
