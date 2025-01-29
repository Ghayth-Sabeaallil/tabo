import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import { CardDetailsProps } from '../Lib/DataType';
import { ItemMarker } from './ItemMarker';
import { Link } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5';
import { formatPrice } from '../utils/formatPrice';

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
                    headerDisabled={true}
                    anchor={markers[selectedItemKey]}
                    onCloseClick={handleInfoWindowClose}>
                    <div className='flex flex-col justify-center w-40 gap-2 p-2'>
                        <IoCloseCircle onClick={handleInfoWindowClose} className='absolute top-5 right-6 cursor-pointer' color='white' size={20} />
                        <img className='border-2 border-black rounded' src={selectedItem?.images![0]} alt="" />
                        <p className='text-[#BA9503] text-base font-bold font-Amiri line-clamp-3'>{selectedItem?.description}</p>
                        <p className='text-[#0D5C02] text-base font-bold font-Amiri'>{formatPrice(selectedItem?.price!)} ل.س</p>
                        <Link className='text-blue text-sm font-bold font-Amiri underline-offset-1 text-blue-700' to={`/item?id=${selectedItem?.id}`}>لمزيد من التفاصيل ...</Link>
                    </div>
                </InfoWindow>
            )}
        </>
    );
};