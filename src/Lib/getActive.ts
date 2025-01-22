import { CardDetailsProps } from "./DataType"

export async function getAllActive(): Promise<number> {
    const response = await fetch('/tabo/DummyData.json'); // Relative path to the public folder
    const data = await response.json();

    const filteredData: CardDetailsProps[] = (data as CardDetailsProps[]).filter(item =>
        (item.is_active === true)
    );
    return filteredData.length;
}
export async function getAllUnActive(): Promise<number> {
    const response = await fetch('/tabo/DummyData.json'); // Relative path to the public folder
    const data = await response.json();

    const filteredData: CardDetailsProps[] = (data as CardDetailsProps[]).filter(item =>
        (item.is_active === false)
    );
    return filteredData.length;
}