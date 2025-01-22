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

const ShopsSearch = () => {
    const [show, setShow] = useState<string>("list");
    const [items, setItems] = useState<CardDetailsProps[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const queryParams = new URLSearchParams(location.search);
            if ([...queryParams].length == 0) {
                loadItemDataset("محل").then(data => setItems(data));
            } else {
                const city = queryParams.get('city');
                const room = queryParams.get('room');
                const area = queryParams.get('area');
                const price = queryParams.get('price');
                const itemsData = getByFilter(city, "محل", Number(room), Number(price + "000000"), Number(area));
                setItems(await itemsData);
            }
            if (items?.length! >= 0 || items?.length == undefined) setLoading(false);
        };
        fetchData();
    }, [location]);
    const apiKey = import.meta.env.VITE_API_KEY;
    return (
        <>
            <Filter path={"shops"} />
            <div className="flex justify-center gap-4 p-1 pr-5">
                <div onClick={() => setShow("map")} className={`${show == "map" ? "bg-hoverBg" : "bg-buttom"} p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex justify-center items-center text-text font-semibold gap-2`}><FaMapLocation size={20} color="#BA9503" />خريطة</div>
                <div onClick={() => setShow("list")} className={`${show == "list" ? "bg-hoverBg" : "bg-buttom"} p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex justify-center items-center text-text font-semibold gap-2`}><FaList size={20} color="#BA9503" />قائمة</div>
            </div>
            <div className="flex justify-center text-2xl text-header p-2">نتائج البحث {items?.length}</div>
            {show === "list" && items?.length! > 0 ?
                <main className="flex flex-col overflow-y-auto h-full p-3 gap-2 sm:grid sm:grid-cols-4 lg:grid-cols-5">
                    {items!.map((item) => <Link key={item.id} to={`/item?id=${item.id}`}><Card key={item.id} city={item.city} images={item.images} price={formatPrice(item.price!)} area={item.area} /></Link>)}
                </main>
                : show === "map" && items?.length! > 0 ?
                    <div className=" flex justify-center items-center h-full text-3xl p-1">
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
                    </div> : loading ? <div className="flex justify-center items-center h-full"><SyncLoader
                        color={"#4E342E"}
                        loading={true}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="SyncLoader"
                    /></div> : <div className="flex justify-center text-header font-extrabold text-3xl items-center h-full">لا يوجد نتائج</div>}
        </>

    );
};

export default ShopsSearch;

