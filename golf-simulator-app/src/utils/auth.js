import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const resetPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, { email });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const logoutUser = () => {
    localStorage.removeItem('user');
};