import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CardDetailsProps } from "../Lib/DataType";
import { getById } from "../Lib/getById";
import { SyncLoader } from "react-spinners";
import { Carousel } from "./Carousel"
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { formatPrice } from "../Lib/formatPrice";
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

const Item = () => {
    const [item, setItem] = useState<CardDetailsProps>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = Number(searchParams.get("id"));
    useEffect(() => {
        const fetchData = async () => {
            const itemData = getById(id!);
            setItem(await itemData);
        };
        fetchData();
    }, []);

    const apiKey = import.meta.env.VITE_API_KEY;


    const images = ["https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/473335188_583727624547034_1253354622655972216_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=wSCigR_TbRYQ7kNvgHhbGG6&_nc_zt=23&_nc_ht=scontent-cph2-1.xx&_nc_gid=AKxpcDoinxB56lqGfqUOLnN&oh=00_AYAWJ7rjU6UBpb2sUrQyJSJY4x4qvj3SR9HMkJ48ujVxqg&oe=6791D6D9", "https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/473547993_583726741213789_7890978986408338988_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=MjSZXHuS8AAQ7kNvgHHrRPQ&_nc_zt=23&_nc_ht=scontent-cph2-1.xx&_nc_gid=AgzjtmapyORDg2LFA-Ky7Sw&oh=00_AYDjteozoNC4VOmWe953-dZWWNUUdBDJB0KZz-2x3dqT0w&oe=6791EF23", "https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/473441332_583726834547113_7342916829017956123_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=lcK6MVcpbjkQ7kNvgGwNXbO&_nc_zt=23&_nc_ht=scontent-cph2-1.xx&_nc_gid=A1CU2HfHrCJIhgNTAnXsS2f&oh=00_AYASXB09usGXElkhe78Nu5LtqI5APsdlhfG7Xm8uTNhADA&oe=6791F1B0"];
    return (
        <>
            {item &&
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex gap-2 justify-center items-center">
                        <div className="grid-cols-1 sm:grid-cols-1 md:grid-cols-5 grid justify-center items-center gap-2 w-full">
                            <div className="md:col-span-3 md:pl-20"><Carousel images={images} /></div>
                            <div className="md:col-span-2 flex flex-col gap-2 grow">
                                <div className="grid grid-cols-5 border-2 border-bg bg-header rounded-xl p-2">
                                    <div className="flex flex-col col-span-2 gap-3 text-text">
                                        <p className="text-xl font-semibold">تاريخ النشر</p>
                                        <p className=" text-xl font-semibold">المدينة</p>
                                        <p className=" text-xl font-semibold">العنوان</p>
                                        <p className=" text-xl font-semibold">السعر</p>
                                        <p className=" text-xl font-semibold">المساحة</p>
                                        <p className=" text-xl font-semibold">النوع</p>
                                        <p className=" text-xl font-semibold">عدد الغرف</p>
                                        <p className=" text-xl font-semibold">الوصف</p>
                                    </div>
                                    <div className="flex flex-col gap-3 col-span-3 text-text">
                                        <p className=" text-xl">{item.date_created}</p>
                                        <p className=" text-xl">{item.city}</p>
                                        <p className=" text-xl">{item.address}</p>
                                        <p className=" text-xl">{formatPrice(item.price!)} ل.س</p>
                                        <p className=" text-xl">{item.area}</p>
                                        <p className=" text-xl">{item.type}</p>
                                        <p className=" text-xl">{item.rooms}</p>
                                        <p className=" text-xl h-20 overflow-auto">{item.description}</p>
                                    </div>
                                </div>

                                <div className="grid-cols-1 sm:grid-cols-1 md:grid-cols-2 grid justify-center gap-4">
                                    <a aria-label="تواصل عبر الواتساب" href={`https://wa.me/963${item.phone}`}><div className="border-2 border-text bg-[#25D366] text-white flex justify-center items-center gap-4 font-Amiri text-3xl p-2 rounded-xl"><p>تواصل عبر الواتساب</p><svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#fff"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#fff"></path> </g></svg></div></a>
                                    <div className="flex justify-center items-center gap-4">
                                        <FacebookShareButton url={window.location.href}>
                                            <FacebookIcon size={50} round />
                                        </FacebookShareButton>
                                        <WhatsappShareButton url={`https://ghayth-sabeaallil.github.io/tabo/#/item?id=${item.id}`}>
                                            <WhatsappIcon size={50} round />
                                        </WhatsappShareButton>
                                        <TelegramShareButton url={`https://ghayth-sabeaallil.github.io/tabo/#/item?id=${item.id}`}>
                                            <TelegramIcon size={50} round />
                                        </TelegramShareButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow h-[300px] md:h-[400px]">
                        <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
                            <Map
                                mapId={'bf51a910020fa25a'}
                                defaultZoom={17}
                                defaultCenter={{ lat: item.location?.lat!, lng: item.location?.lng! }}
                                gestureHandling={'greedy'}
                                mapTypeId="roadmap"
                                disableDefaultUI={false}
                                colorScheme="FOLLOW_SYSTEM"
                            >
                                <Marker
                                    position={{ lat: item.location?.lat!, lng: item.location?.lng! }}
                                />
                            </Map>
                        </APIProvider></div>
                </div>
            }



            {!item && <div className="flex justify-center items-center h-full"><SyncLoader
                color={"#4E342E"}
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                data-testid="SyncLoader"
            /></div>}
        </>

    );
};

export default Item;