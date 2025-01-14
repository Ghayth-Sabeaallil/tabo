export type CardProps = {
    id?: string,
    description?: string,
    primaryImage?: string,
    area?: number,
    prise?: number,

};

export type CardDetailsProps = {
    id?: string,
    description?: string,
    images?: string[],
    address?: string,
    prise?: number,
    rooms?: number,
    phone?: number,
    location?: { lat: number, lng: number },
    city?: string,
    area?: number,
    type?: string,
};