export function getLatLngFromUrl(url: string): { lat: number, lng: number } | null {
    if (url.length < 40) {
        const [lat, lng] = url.split(", ").map(num => parseFloat(parseFloat(num).toFixed(4)));
        return { lat, lng };
    } else {
        const regex = /@?(-?\d+\.\d+),(-?\d+\.\d+)/;
        const match = url.match(regex);
        if (match) {
            return {
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2])
            };
        }
    }

    return null;
}