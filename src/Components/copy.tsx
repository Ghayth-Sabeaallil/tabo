import Card from "./Card";
import data from "../Lib/DummyData.json"
import { Link } from "react-router-dom";
import Filter from "./Filter";
import { FaList, FaMapLocation } from "react-icons/fa6";
import { useState } from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { CardDetailsProps } from "../Lib/DataType";
import { MarkerClusterer } from "@googlemaps/markerclusterer";


const Main = () => {
    const [show, setShow] = useState<string>("list");
    const [selectedMarker, setSelectedMarker] = useState<CardDetailsProps | null>(null);
    const [id, setId] = useState<string>();



    const handleMarkerClick = (item: CardDetailsProps) => {
        setSelectedMarker(item);
        setId(item.id!);
    };

    const handleClose = () => {
        setSelectedMarker(null);
    };
    return (
        <>
            <Filter />
            <div className="flex gap-4 bg-[#d2f2ce] p-1 rounded-lg pr-5">
                <div className="cursor-pointer" onClick={() => setShow("map")}><FaMapLocation size={20} color="#0D5C02" /></div>
                <div className="cursor-pointer" onClick={() => setShow("list")}><FaList size={20} color="#0D5C02" /></div>
            </div>
            {show === "list" ?
                <main className="flex flex-col overflow-y-auto h-full p-3 gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 bg-[#d2f2ce]">
                    {data.map((item) => <Link key={item.id} to={`/item?id=${item.id}`}><Card key={item.id} description={item.description} primaryImage={item.images[0]} prise={item.prise} area={item.area} /></Link>)}
                </main>
                :
                <div className="bg-[#d2f2ce] flex justify-center items-center h-full text-3xl p-1">
                    <APIProvider apiKey={'AIzaSyBNh-K6y7-8uOgzJt1L-D5s0GHbgjksvuI'} onLoad={() => console.log('Maps API has loaded.')}>
                        <Map
                            defaultZoom={8}
                            defaultCenter={{ lat: 35.0271824852867, lng: 38.51505715398323 }}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                            colorScheme="FOLLOW_SYSTEM"
                            onClick={handleClose}
                        >

                            {data.map((item: CardDetailsProps) => <Marker onClick={() => handleMarkerClick(item)} position={item.location} />)}
                            {selectedMarker && (
                                <Link to={`/item?id=${id}`}><div className="absolute top-2 right-2 bg-white p-2 shadow-lg rounded-lg z-50 cursor-pointer">
                                    <h4>{selectedMarker.id}</h4>
                                    <p>Latitude: {selectedMarker.location?.lat}</p>
                                    <p>Longitude: {selectedMarker.location?.lng}</p>
                                </div></Link>

                            )}
                        </Map>
                    </APIProvider>
                </div>}
        </>

    );
};

export default Main;