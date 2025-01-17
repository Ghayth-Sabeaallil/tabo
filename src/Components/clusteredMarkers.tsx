import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import { CardDetailsProps } from '../Lib/DataType';
import { ItemMarker } from './ItemMarker';
import { Link } from 'react-router-dom';

export type ClusteredItemMarkersProps = {
    items: CardDetailsProps[];
};

export const ClusteredMarkers = ({ items }: ClusteredItemMarkersProps) => {
    const [markers, setMarkers] = useState<{ [id: string]: Marker }>({});
    const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);

    const selectedItem = useMemo(
        () =>
            items && selectedItemKey
                ? items.find(t => t.id === selectedItemKey)!
                : null,
        [items, selectedItemKey]
    );

    // create the markerClusterer once the map is available and update it when
    // the markers are changed
    const map = useMap();
    const clusterer = useMemo(() => {
        if (!map) return null;

        return new MarkerClusterer({ map });
    }, [map]);

    useEffect(() => {
        if (!clusterer) return;

        clusterer.clearMarkers();
        clusterer.addMarkers(Object.values(markers));
    }, [clusterer, markers]);

    // this callback will effectively get passsed as ref to the markers to keep
    // tracks of markers currently on the map
    const setMarkerRef = useCallback((marker: Marker | null, id: string) => {
        setMarkers(markers => {
            if ((marker && markers[id]) || (!marker && !markers[id]))
                return markers;

            if (marker) {
                return { ...markers, [id]: marker };
            } else {
                const { [id]: _, ...newMarkers } = markers;

                return newMarkers;
            }
        });
    }, []);

    const handleInfoWindowClose = useCallback(() => {
        setSelectedItemKey(null);
    }, []);

    const handleMarkerClick = useCallback((item: CardDetailsProps) => {
        setSelectedItemKey(item.id!);
    }, []);

    return (
        <>
            {items.map(item => (
                <ItemMarker
                    key={item.id}
                    item={item}
                    onClick={handleMarkerClick}
                    setMarkerRef={setMarkerRef}
                />
            ))}

            {selectedItemKey && (

                <InfoWindow
                    anchor={markers[selectedItemKey]}
                    onCloseClick={handleInfoWindowClose}>
                    <Link to={`/item?id=${selectedItem?.id}`}>Open Link</Link>
                    {selectedItem?.description}
                </InfoWindow>
            )}
        </>
    );
};