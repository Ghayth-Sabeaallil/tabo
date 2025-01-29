export type CardDetailsProps = {

    _id?: string,
    id?: string,
    description?: string,
    images?: string[],
    address?: string,
    price?: number,
    rooms?: number,
    phone?: number,
    location?: { lat: number, lng: number },
    city?: string,
    area?: number,
    type?: string,
    date_created?: string,
    is_active?: boolean,
};
