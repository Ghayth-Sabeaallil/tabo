import { CardDetailsProps } from '../Lib/DataType';
import type { Marker } from '@googlemaps/markerclusterer';
import { useCallback } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { IoMdPin } from 'react-icons/io';

export type ItemMarkerProps = {
    item: CardDetailsProps;
    onClick: (item: CardDetailsProps) => void;
    setMarkerRef: (marker: Marker | null, _id: string) => void;
};

export const ItemMarker = (props: ItemMarkerProps) => {
    const { item, onClick, setMarkerRef } = props;

    const handleClick = useCallback(() => onClick(item), [onClick, item]);
    const ref = useCallback(
        (marker: google.maps.marker.AdvancedMarkerElement) =>
            setMarkerRef(marker, item._id!),
        [setMarkerRef, item._id!]
    );

    return (
        <AdvancedMarker position={item.location} ref={ref} onClick={handleClick}>
            {item.type === "شقة" && <IoMdPin color='orange' size={30} />}
            {item.type === "أرض" && <IoMdPin color='green' size={30} />}
            {item.type === "فيلا" && <IoMdPin color='red' size={30} />}
            {item.type === "محل" && <IoMdPin color='blue' size={30} />}
        </AdvancedMarker>
    );
};