import axios from 'axios';
import { CardDetailsProps } from '../Lib/DataType';

const API_URL = 'https://tabo.onrender.com';

export const post = async (city: string, address: string, description: string, type: string, area: number, rooms: number, price: number, phone: number, location: object, is_active: boolean, date_created: string, images: string[]) => {
    try {
        await axios.post(`${API_URL}/api/items/register`, { city, address, description, type, area, rooms, price, phone, location, date_created, is_active, images }, {
            withCredentials: true,
        });
    } catch (error) {
        console.error('Error registering', error);
    }
};

export const getByCreator = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/items/creator`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error getByCreator', error);
    }
};

export const getByID = async (id: string): Promise<CardDetailsProps | object | undefined> => {
    try {
        const response = await axios.get(`${API_URL}/api/items/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getByID', error);
        return undefined;
    }
};

export const getApartments = async (): Promise<CardDetailsProps[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/items/apartments`);
        return response.data;
    } catch (error) {
        console.error('Error getApartments', error);
        return [];
    }
};

export const getFarms = async (): Promise<CardDetailsProps[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/items/farms`);
        return response.data;
    } catch (error) {
        console.error('Error getFarms', error);
        return [];
    }
};

export const getShops = async (): Promise<CardDetailsProps[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/items/shops`);
        return response.data;
    } catch (error) {
        console.error('Error getShops', error);
        return [];
    }
};

export const getVillas = async (): Promise<CardDetailsProps[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/items/villas`);
        return response.data;
    } catch (error) {
        console.error('Error getVillas', error);
        return [];
    }
};

export const deleteItem = async (_id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/api/items/delete/${_id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleteItem', error);
    }
};

export const deleteImages = async (images: string[]) => {
    if (images.length > 0) {
        const publicID = extractPublicIds(images);
        try {
            const response = await axios.delete(`${API_URL}/api/items/delete-image`, {
                data: { public_ids: publicID }, // Axios DELETE requests use 'data' for payload
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleteImages', error);
        }
    }
};

const extractPublicIds = (imageUrls: string[]): string[] => {
    const regex = /\/upload\/v\d+\/(.+)\.\w+$/;
    return imageUrls
        .map(imageUrl => {
            const match = imageUrl.match(regex);
            return match ? match[1] : null;
        })
        .filter((id): id is string => id !== null); // Filter out null values
};
