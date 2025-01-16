import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import { CardDetailsProps } from './items';
import { ItemMarker } from './Marker';
import { Link } from 'react-router-dom';

export type ClusteredItemMarkersProps = {
    items: CardDetailsProps[];
};

/**
 * The ClusteredTreeMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */
export const ClusteredMarkers = ({ items }: ClusteredItemMarkersProps) => {
    const [markers, setMarkers] = useState<{ [id: string]: Marker }>({});
    const [selectedTreeKey, setSelectedTreeKey] = useState<string | null>(null);

    const selectedTree = useMemo(
        () =>
            items && selectedTreeKey
                ? items.find(t => t.id === selectedTreeKey)!
                : null,
        [items, selectedTreeKey]
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
        setSelectedTreeKey(null);
    }, []);

    const handleMarkerClick = useCallback((tree: CardDetailsProps) => {
        setSelectedTreeKey(tree.id!);
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

            {selectedTreeKey && (

                <InfoWindow
                    anchor={markers[selectedTreeKey]}
                    onCloseClick={handleInfoWindowClose}>
                    <Link to={`/item?id=${selectedTree?.id}`}>Open Link</Link>
                    {selectedTree?.description}
                </InfoWindow>
            )}
        </>
    );
};