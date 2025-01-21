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
import { formatPrice } from "../Lib/formatPrice";

const ApartmentsSearch = () => {
    const [show, setShow] = useState<string>("list");
    const [items, setItems] = useState<CardDetailsProps[]>();
    const location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
            const queryParams = new URLSearchParams(location.search);
            if ([...queryParams].length == 0) {
                loadItemDataset("شقة").then(data => setItems(data));
            } else {
                const city = queryParams.get('city');
                const room = queryParams.get('room');
                const area = queryParams.get('area');
                const price = queryParams.get('price');
                const itemsData = getByFilter(city, "شقة", Number(room), Number(price + "000000"), Number(area));
                setItems(await itemsData);
            }
        };
        fetchData();
    }, [location]);
    const apiKey = import.meta.env.VITE_API_KEY;
    return (
        <>
            <Filter path={"apartments"} />
            <div className="flex justify-center gap-4 bg-bg bg-opacity-50 p-1 pr-5">
                <div className="cursor-pointer" onClick={() => setShow("map")}><FaMapLocation size={35} color="#4E342E" /></div>
                <div className="cursor-pointer" onClick={() => setShow("list")}><FaList size={35} color="#4E342E" /></div>
            </div>
            {show === "list" && items?.length! > 0 ?
                <main className="flex flex-col overflow-y-auto h-full p-3 gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:grid-rows-2 lg:grid-rows-2 bg-bg bg-opacity-50">
                    {items!.map((item) => <Link key={item.id} to={`/item?id=${item.id}`}><Card key={item.id} address={item.address} images={item.images} price={formatPrice(item.price!)} area={item.area} /></Link>)}
                </main>
                : show === "map" && items?.length! > 0 ?
                    <div className="bg-bg flex justify-center items-center h-full text-3xl p-1">
                        <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
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
                    </div> : <div className="flex justify-center items-center h-full bg-bg bg-opacity-50"><SyncLoader
                        color={"#4E342E"}
                        loading={true}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="SyncLoader"
                    /></div>}
        </>

    );
};

export default ApartmentsSearch;

