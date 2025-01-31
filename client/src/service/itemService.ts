import axios from 'axios';

const API_URL = 'http://localhost:3000';

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
        const response = await axios.get(`${API_URL}/api/items`, {
            withCredentials: true,
        });
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
        const response = await axios.delete(`${API_URL}/api/items/delete/${_id}`, {
            withCredentials: true,
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error getByCreator', error);
    }
};

export const deleteImages = async (images: string[]) => {
    const publicID = extractPublicIds(images);
    console.log(publicID);
    try {
        const response = await axios.delete(`${API_URL}/api/items/delete-image`, {
            data: { public_ids: publicID }, // Axios DELETE requests use 'data' for payload
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error getByCreator', error);
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
