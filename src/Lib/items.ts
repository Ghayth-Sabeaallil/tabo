import { CardDetailsProps } from "./DataType"

export async function loadItemDataset(type: string): Promise<CardDetailsProps[]> {
    const response = await fetch('/DummyData.json'); // Relative path to the public folder
    const data = await response.json();

    const filteredData: CardDetailsProps[] = (data as CardDetailsProps[]).filter(item =>
        (item.type === type) &&
        (item.is_active === true)
    );
    return filteredData;
}
{/*
import { CardDetailsProps } from "./DataType"

export async function loadItemDataset(): Promise<CardDetailsProps[]> {
    const response = await fetch('https://raw.githubusercontent.com/Ghayth-Sabeaallil/tabo/refs/heads/main/src/Lib/DummyData.json'); // Relative path to the public folder
    const data = await response.json();

    const filteredData: CardDetailsProps[] = (data as CardDetailsProps[]).filter(item => item.is_active === true);
    return filteredData;
*/}