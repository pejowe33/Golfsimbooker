import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

// Function to create a booking
export const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Function to get available time slots
export const getAvailableSlots = async (date) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bookings/available-slots`, { params: { date } });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Function to register a user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Function to login a user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Function to reset password
export const resetPassword = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { email });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Function to get leagues
export const getLeagues = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/leagues`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Function to book a lesson
export const bookLesson = async (lessonData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/lessons`, lessonData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Function to purchase a gift card
export const purchaseGiftCard = async (giftCardData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/giftcards`, giftCardData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};