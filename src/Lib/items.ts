import { CardDetailsProps } from "./DataType"

export async function loadItemDataset(): Promise<CardDetailsProps[]> {
    console.log("hiiiiiii")
    const response = await fetch('https://raw.githubusercontent.com/Ghayth-Sabeaallil/tabo/refs/heads/gh-pages/DummyData.json'); // Relative path to the public folder
    const data = await response.json();

    const filteredData: CardDetailsProps[] = (data as CardDetailsProps[]).filter(item => item.is_active === true);
    return filteredData;
}
{/*
import { CardDetailsProps } from "./DataType";

export async function loadItemDataset(): Promise<CardDetailsProps[]> {
    try {
        const response = await fetch("http://midanghost.pythonanywhere.com/getAllData", {
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

export default loadItemDataset;
*/}