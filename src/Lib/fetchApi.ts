export async function fetchApi() {
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

        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error("Error loading dataset:", error);
        return []; // Return an empty array in case of an error
    }
}

export default fetchApi;