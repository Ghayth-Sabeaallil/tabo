export function getLatLngFromUrl(url: string): { lat: number, lng: number } | null {
    if (url.length < 40) {
        let num = (url.match(/,/g) || []).length;
        if (num === 1) {
            let formattedStr = url.replace(/,/g, ', ');
            const [lat, lng] = formattedStr
                .split(', ')
                .map(num => parseFloat(parseFloat(num).toFixed(6)));
            return { lat, lng };
        } else {
            let newUrl = url.replace(/^([^,]*),/, '$1.').replace(/,([^,]*)$/, '.$1');
            let formattedStr = newUrl.replace(/,/g, ', ');
            const [lat, lng] = formattedStr
                .split(', ')
                .map(num => parseFloat(parseFloat(num).toFixed(6)));
            return { lat, lng };
        }
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