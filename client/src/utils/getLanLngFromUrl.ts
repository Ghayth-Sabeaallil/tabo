export function getLatLngFromUrl(url: string): { lat: number, lng: number } | null {
    const regex = /@?(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = url.match(regex);
    if (match) {
        return {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2])
        };
    }
    return null;
}