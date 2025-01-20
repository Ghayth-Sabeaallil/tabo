import { CardDetailsProps } from "./DataType"

export async function getById(id: number): Promise<CardDetailsProps> {
    const response = await fetch('/tabo/DummyData.json'); // Relative path to the public folder
    const data = await response.json();

    const item = (data as CardDetailsProps[]).find(item => item.id === id);
    return item!;
}

/*
import { CardDetailsProps } from "./DataType"

export async function getById(id: number): Promise<CardDetailsProps> {
    const response = await fetch('https://raw.githubusercontent.com/Ghayth-Sabeaallil/tabo/refs/heads/main/src/Lib/DummyData.json'); // Relative path to the public folder
    const data = await response.json();

    const item = (data as CardDetailsProps[]).find(item => item.id === id);
    return item!;
}
*/