import Card from "./Card";
import { Link, useLocation } from "react-router-dom";
import Filter from "./Filter";
import { FaList, FaMapLocation } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { loadItemDataset } from '../Lib/items';
import { ClusteredMarkers } from './clusteredMarkers';
import { CardDetailsProps } from "../Lib/DataType";
import { SyncLoader } from "react-spinners";
import { getByFilter } from "../Lib/getByFilter";

const Main = () => {
    const [show, setShow] = useState<string>("list");
    const [items, setItems] = useState<CardDetailsProps[]>();
    const location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
            const currentPath = window.location.pathname;
            const queryParams = window.location.search;
            if (currentPath === '/search' && !queryParams) {
                loadItemDataset().then(data => setItems(data));
            } else {
                const searchParams = new URLSearchParams(location.search);
                const city = searchParams.get('city');
                const room = searchParams.get('room');
                const area = searchParams.get('area');
                const price = searchParams.get('price');
                const type = searchParams.get('type');
                const itemsData = getByFilter(city, type, Number(room), Number(price + "000000"), Number(area));
                console.log(itemsData)

                setItems(await itemsData);
            }
        };
        fetchData();
    }, [location]);

    return (
        <>
            <Filter />
            <div className="flex gap-4 bg-[#d2f2ce] p-1 rounded-lg pr-5">
                <div className="cursor-pointer" onClick={() => setShow("map")}><FaMapLocation size={20} color="#0D5C02" /></div>
                <div className="cursor-pointer" onClick={() => setShow("list")}><FaList size={20} color="#0D5C02" /></div>
            </div>
            {show === "list" && items?.length! > 0 ?
                <main className="flex flex-col overflow-y-auto h-full p-3 gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 bg-[#d2f2ce]">
                    {items!.map((item) => <Link key={item.id} to={`/item?id=${item.id}`}><Card key={item.id} description={item.description} images={item.images} prise={item.prise} area={item.area} /></Link>)}
                </main>
                : show === "map" && items?.length! > 0 ?
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
                                {<ClusteredMarkers items={items!} />}
                            </Map>
                        </APIProvider>
                    </div> : <div className="flex justify-center items-center h-full bg-[#d2f2ce]"><SyncLoader
                        color={"#0D5C02"}
                        loading={true}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="SyncLoader"
                    /></div>}
        </>

    );
};

export default Main;
