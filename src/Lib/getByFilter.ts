import data from './DummyData.json';
import { CardDetailsProps } from "./DataType"


export async function getByFilter(
    city: string | null,
    type: string | null,
    room: number | null,
    price: number | null,
    area: number | null
): Promise<CardDetailsProps[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredItems = (data as CardDetailsProps[]).filter((item) => {
                return (
                    (city === null || item.city === city) &&
                    (type === null || item.type === type) &&
                    (room === 0 || item.rooms! <= room!) &&
                    (price === 0 || item.prise! <= price!) &&
                    (area === 0 || item.area! <= area!)
                );
            });
            resolve(filteredItems);
        }, 500);
    });
}

export default data as CardDetailsProps[];