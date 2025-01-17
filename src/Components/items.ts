import data from '../Lib/DummyData.json';
import { CardDetailsProps } from "../Lib/DataType"
import { CategoryData } from "../Lib/DataType"

export async function loadItemDataset(): Promise<CardDetailsProps[]> {
    return new Promise(resolve => {
        setTimeout(() => resolve(data as CardDetailsProps[]), 500);
    });
}

export function getCategories(items?: CardDetailsProps[]): CategoryData[] {
    if (!items) return [];

    const countByCategory: { [c: string]: number } = {};
    for (const t of items) {
        if (!countByCategory[t.type!]) countByCategory[t.type!] = 0;
        countByCategory[t.type!]++;
    }

    return Object.entries(countByCategory).map(([key, value]) => {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        return {
            key: key,
            label,
            count: value
        };
    });
}

export default data as CardDetailsProps[];