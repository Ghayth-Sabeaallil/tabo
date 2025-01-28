import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const post = async (city: string, address: string, description: string, type: string, area: number, rooms: number, price: number, phone: number, location: object, is_active: boolean, date_created: string, creator: string) => {
    try {
        await axios.post(`${API_URL}/api/items/register`, { city, address, description, type, area, rooms, price, phone, location, date_created, is_active, creator });
    } catch (error) {
        console.error('Error registering', error);
    }
};

export const getFormattedDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};