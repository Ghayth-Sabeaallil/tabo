import data from '../Lib/DummyData.json';

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

export type CategoryData = {
    key: string;
    label: string;
    count: number;
};


for (let i = 0; i < data.length; i++) {
    (data[i] as CardDetailsProps).id = `item-${i}`;
}

/**
 * Simulates async loading of the dataset from an external source.
 * (data is inlined for simplicity in our build process)
 */
export async function loadItemDataset(): Promise<CardDetailsProps[]> {
    // simulate loading the trees from an external source
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