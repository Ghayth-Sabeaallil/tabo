import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const post = async (city: string, address: string, description: string, type: string, area: number, rooms: number, price: number, phone: number, location: object, is_active: boolean, date_created: string, creator: string, images: string[]) => {
    try {
        await axios.post(`${API_URL}/api/items/register`, { city, address, description, type, area, rooms, price, phone, location, date_created, is_active, creator, images });
    } catch (error) {
        console.error('Error registering', error);
    }
};

export const getByCreator = async (username: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/items/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error getByCreator', error);
    }
};

export const getByID = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/items/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getByCreator', error);
    }
};

export const deleteItem = async (_id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/api/items/delete/${_id}`);
        return response.data;
    } catch (error) {
        console.error('Error getByCreator', error);
    }
};