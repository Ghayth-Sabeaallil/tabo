import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (username: string, password: string) => {
    try {
        await axios.post(`${API_URL}/api/users/register`, { username, password });
    } catch (error) {
        console.error('Error registering', error);
    }
};

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/users/login`, { username, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                return { error: 'Invalid username or password' };
            }
        }
        return { error: 'An error occurred while logging in' };
    }
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/api/users/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.error('Error logging out', error);
    }
};

export const getProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/users/profile`, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                return { error: 'Invalid username or password' };
            }
        }
        return { error: 'An error occurred while logging in' };
    }
};
