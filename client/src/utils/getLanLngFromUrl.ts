export function getLatLngFromUrl(url: string): { lat: number, lng: number } | null {
    const regex = /@?(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = url.match(regex);
    console.log(match)
    if (url.length < 33) {
        const [lat, lng] = url.split(", ").map(num => parseFloat(parseFloat(num).toFixed(4)));
        return { lat, lng };
    }
    if (match) {
        return {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2])
        };
    }
    return null;
}