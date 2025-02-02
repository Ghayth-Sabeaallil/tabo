import axios from "axios";
import { CardDetailsProps } from "./DataType"
const API_URL = import.meta.env.VITE_API_URL;

export async function getByFilter(
    city: string | null,
    type: string | null,
    room: number | null,
    price: number | null,
    area: number | null
): Promise<CardDetailsProps[]> {

    const typeSelect: Record<string, string> = {
        "شقة": "apartments",
        "أرض": "farms",
        "محل": "shops",
        "فيلا": "villas"
    }
    const select = typeSelect[type!];

    const response = await axios.get(`${API_URL}/api/items/${select}`);
    const data = await response.data;
    /*const response = await fetch('/Data.json'); // Relative path to the public folder
    const data = await response.json();*/


    const item: CardDetailsProps[] = (data as CardDetailsProps[]).filter((item) => {
        return (
            (city == "جميع المحافظات" || city === null || item.city === city) &&
            (type === null || item.type === type) &&
            (room === null || room === 0 || item.rooms! <= room!) &&
            (Number.isNaN(price) || price === null || price === 0 || item.price! <= price!) &&
            (area === null || area === 0 || item.area! <= area!) &&
            (item.is_active === true)
        );
    });
    return item;

}