import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CardDetailsProps } from "../Lib/DataType";
//import { getById } from "../Lib/getById";
import { Carousel } from "./Carousel"
import { formatPrice } from "../utils/formatPrice";
import { FaShareAlt } from "react-icons/fa";
import { getByID } from "../service/itemService";
import { SyncLoader } from "react-spinners";

const Item = () => {
    const [item, setItem] = useState<CardDetailsProps | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            //const itemData = getById(id!);
            const itemData = getByID(id!);
            setItem(await itemData);
            if ((await itemData) || !item) {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFallbackShare = () => {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl);
        alert("تم نسخ الرابط بنجاح. بامكانك مشاركته الان عبر لصق الرابط وارساله");
    };


    function confirmation() {
        navigator.clipboard.writeText(item?.phone?.toString() || '');
        const userConfirmed = confirm("الرجاء التأكد من صحة المعلومات قبل توقيع أي عقد. طابو مجرد منصة لعرض الاعلانات لقد تم نسخ رقم الهاتف اذا لم تتمكن من الوصول للمالك عبرالواتساب!!!");
        if (userConfirmed) {
            window.location.href = `https://wa.me/${item?.phone}`;
        }
    }

    const handleShare = async () => {

        const shareData = {
            title: "طابو للعقارات",
            text: item?.description,
            url: window.location.href,
            img: item?.images![0]
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
            }
        } else {
            handleFallbackShare();
        }
    };

    return (
        <>
            {(item && item.is_active) ?
                <div className="grid grid-rows-1 sm:grid-rows-2 grid-rows-2 p-4 gap-4 items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <div className="md:col-span-2"><Carousel images={item.images!} /></div>
                        <div className="flex flex-col justify-center gap-2 border-4 rounded border-header p-1 bg-bg bg-opacity-40">
                            <a onClick={confirmation} aria-label="تواصل مع المالك"><div className="cursor-pointer hover:bg-hoverBg border-2 border-black bg-header text-text text-xl sm:text-2xl flex justify-center items-center gap-2 font-Amiri md:text-2xl font-extrabold p-1 rounded-xl"><p>الاتصال بالمالك</p><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#BA9503"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#BA9503"></path> </g></svg></div></a>
                            <div onClick={handleShare} className="hover:bg-hoverBg border-2 cursor-pointer select-none border-black bg-header text-text text-xl sm:text-xl flex justify-center items-center gap-4 font-Amiri md:text-2xl font-extrabold p-2 rounded-xl">مشاركة الرابط <FaShareAlt color="#BA9503" /></div>
                            {item.location &&
                                <>  <iframe
                                    className="w-auto h-auto border-2 border-header"
                                    loading="lazy"
                                    allowFullScreen={true}
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://www.google.com/maps?q=${item.location?.lat},${item.location?.lng}&z=15&output=embed`}
                                >
                                </iframe>

                                </>

                            }
                        </div>
                    </div>
                    <div className=" flex flex-col gap-2 grow">
                        <div className="flex flex-col border-2 border-bg bg-header rounded-xl p-2 gap-4 text-text p-4">
                            <div className="grid grid-cols-5 gap-4">
                                <p className="col-span-2 text-xl font-semibold">تاريخ النشر</p>
                                <p className="col-span-3 text-xl">{item.date_created}</p>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                <p className="col-span-2 text-xl font-semibold">المدينة</p>
                                <p className="col-span-3 text-xl">{item.city}</p>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                <p className="col-span-2 text-xl font-semibold">العنوان</p>
                                <p className="col-span-3 text-xl">{item.address}</p>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                <p className="col-span-2 text-xl font-semibold">السعر</p>
                                <p className="col-span-3 text-xl">{formatPrice(item.price!)} ل.س</p>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                <p className="col-span-2 text-xl font-semibold">المساحة</p>
                                {item.type === "أرض" ? <p className="col-span-3 text-xl">{item.area} دونم</p> : <p className="col-span-3 text-xl">{item.area} متر مربع</p>}
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                <p className="col-span-2 text-xl font-semibold">النوع</p>
                                <p className="col-span-3 text-xl">{item.type}</p>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                {item.type !== "محل" && <p className="col-span-2 text-xl font-semibold">عدد الغرف</p>}
                                {item.type !== "محل" && <p className="col-span-3 text-xl">{item.rooms}</p>}
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                <p className="col-span-2 text-xl font-semibold">الوصف</p>
                                <p className="col-span-3 text-xl h-20 overflow-auto">{item.description}</p>
                            </div>
                        </div>
                    </div>
                </div> : loading ? <div className="flex justify-center items-center h-full"><SyncLoader
                    color={"#4E342E"}
                    loading={true}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="SyncLoader"
                /></div> : <div className="flex flex-col gap-4 justify-center items-center h-screen text-3xl text-header"><p>هذا العنصر مباع أو غير متوفر</p><a href="/"><div className="text-4xl font-bold font-Amiri text-text bg-header p-2 rounded">العودة الى الرئيسية</div></a>
                </div>
            }

        </>

    );
};

export default Item;