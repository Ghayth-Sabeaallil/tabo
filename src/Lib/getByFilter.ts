{/*import data from './DummyData.json';
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
                    (price === 0 || item.price! <= price!) &&
                    (area === 0 || item.area! <= area!) &&
                    (item.is_active === true)
                );
            });
            resolve(filteredItems);
        }, 500);
    });
}

export default data as CardDetailsProps[];*/}


/*import { CardDetailsProps } from "./DataType";

export async function getByFilter(
    city: string | null,
    type: string | null,
    room: string | null,
    price: string | null,
    area: string | null
): Promise<CardDetailsProps[]> {
    try {
        const response = await fetch(`http://midanghost.pythonanywhere.com/getadsbyfilter?city=${city}&type=${type}&price=${price}&rooms=${room}&area=${area}`, {
            method: "GET", // HTTP method
            headers: {
                "Content-Type": "application/json", // Specify content type
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data: CardDetailsProps[] = await response.json();
        const item: CardDetailsProps[] = data.filter(item => item.is_active === true);

        return item;
    } catch (error) {
        console.error("Error loading dataset:", error);
        return []; // Return an empty array in case of an error
    }
}

export default getByFilter;*/
