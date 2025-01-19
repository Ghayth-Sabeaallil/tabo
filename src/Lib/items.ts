import data from './DummyData.json';
import { CardDetailsProps } from "./DataType"

export async function loadItemDataset(): Promise<CardDetailsProps[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const item: CardDetailsProps[] = (data as CardDetailsProps[]).filter(item => item.is_active === true);
            resolve(item);
        }, 500);
    });
}

export default data as CardDetailsProps[];