import data from './DummyData.json';
import { CardDetailsProps } from "./DataType"

export async function loadItemDataset(): Promise<CardDetailsProps[]> {
    return new Promise(resolve => {
        setTimeout(() => resolve(data as CardDetailsProps[]), 500);
    });
}

export default data as CardDetailsProps[];