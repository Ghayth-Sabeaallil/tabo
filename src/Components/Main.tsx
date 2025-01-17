import Card from "./Card";
import data from "../Lib/DummyData.json"
import { Link } from "react-router-dom";
import Filter from "./Filter";
import { FaList, FaMapLocation } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { loadItemDataset } from './items';
import { ClusteredMarkers } from './clusteredMarkers';
import { CardDetailsProps } from "../Lib/DataType";

const Main = () => {
    const [show, setShow] = useState<string>("list");
    const [item, setItems] = useState<CardDetailsProps[]>();
    useEffect(() => {
        loadItemDataset().then(data => setItems(data));
    }, []);

    return (
        <>
            <Filter />
            <div className="flex gap-4 bg-[#d2f2ce] p-1 rounded-lg pr-5">
                <div className="cursor-pointer" onClick={() => setShow("map")}><FaMapLocation size={20} color="#0D5C02" /></div>
                <div className="cursor-pointer" onClick={() => setShow("list")}><FaList size={20} color="#0D5C02" /></div>
            </div>
            {show === "list" ?
                <main className="flex flex-col overflow-y-auto h-full p-3 gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 bg-[#d2f2ce]">
                    {data.map((item) => <Link key={item.id} to={`/item?id=${item.id}`}><Card key={item.id} description={item.description} images={item.images} prise={item.prise} area={item.area} /></Link>)}
                </main>
                :
                <div className="bg-[#d2f2ce] flex justify-center items-center h-full text-3xl p-1">
                    <APIProvider apiKey={'AIzaSyBNh-K6y7-8uOgzJt1L-D5s0GHbgjksvuI'} onLoad={() => console.log('Maps API has loaded.')}>
                        <Map
                            mapId={'bf51a910020fa25a'}
                            defaultZoom={7}
                            defaultCenter={{ lat: 35.0271824852867, lng: 38.51505715398323 }}
                            gestureHandling={'greedy'}
                            mapTypeId="roadmap"
                            disableDefaultUI={false}
                            colorScheme="FOLLOW_SYSTEM"
                        >
                            {<ClusteredMarkers items={item!} />}
                        </Map>
                    </APIProvider>
                </div>}
        </>

    );
};

export default Main;
