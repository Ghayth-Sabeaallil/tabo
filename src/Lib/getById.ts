import data from './DummyData.json';
import { CardDetailsProps } from "./DataType"

export async function getById(id: number): Promise<CardDetailsProps> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const item = (data as CardDetailsProps[]).find(item => item.id === id);
            resolve(item!);
        }, 500);
    });
}

export default data as CardDetailsProps[];