import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CardDetailsProps } from "../Lib/DataType";
import { getById } from "../Lib/getById";
import { SyncLoader } from "react-spinners";

const Item = () => {
    const [item, setItem] = useState<CardDetailsProps>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    useEffect(() => {
        const fetchData = async () => {
            const itemData = getById(id!);
            setItem(await itemData);
        };
        fetchData();
    }, []);
    const images = ["https://media.istockphoto.com/id/1350191166/sv/foto/fluffy-silver-colored-cat-looking-grumpy-and-displeased-on-brown-background.webp?s=2048x2048&w=is&k=20&c=9c4FJPa6oQjDbFWsjH29KJuG-IK0K1I2yADxJX1uofM=", "https://media.istockphoto.com/id/1350190494/sv/foto/fluffy-british-shorthair-cat-making-funny-face-with-mouth-open-meowing-on-yellow-background.jpg?s=1024x1024&w=is&k=20&c=u9ZtLSWmhHA1N5eQcPLNurni2mp7aNijDopT3LvC8Ng=", "https://media.istockphoto.com/id/1061222330/sv/foto/portr%C3%A4tt-av-s%C3%B6t-katt-skotska-rak-i-studio-med-gul-bakgrund-n%C3%A4rbild.jpg?s=1024x1024&w=is&k=20&c=4TxzZTpNTZoD00ric_AWvGkpOhvnLfPU26bysCp8tw4="];
    return (
        <>
            <div className="h-full bg-[#d2f2ce] p-4 flex justify-center items-center">{item ?
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col justify-center items-center gap-4"><p className="text-[#BA9503] text-2xl font-bold font-Amiri">تواصل مباشرة مع مالك العقار</p>
                        <a aria-label="تواصل عبر الواتساب" href={`https://wa.me/963${item.phone}`}><img alt="Chat on WhatsApp" src="/WhatsAppButtonGreenLarge.svg" /></a>
                        <svg viewBox="0 0 24 24" fill="none" width={"15%"} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="17" r="1" fill="#BA9503"></circle> <path d="M12 10L12 14" stroke="#BA9503" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z" stroke="#BA9503" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <p className="text-[#BA9503] text-3xl font-bold font-Amiri">تحذير هام</p>
                        <p className="text-[#BA9503] text-2xl font-bold font-Amiri text-center">نحن لسنا مسؤولون عن عمليات الاحتيال</p>
                        <p className="text-[#BA9503] text-2xl font-bold font-Amiri text-center">يرجى التأكد دائما من صحة المعلومات و تطابقها مع العقود</p>
                    </div>
                    <div>

                    </div>
                </div>
                : <SyncLoader
                    color={"#0D5C02"}
                    loading={true}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="SyncLoader"
                />}</div>
        </>

    );
};

export default Item;
