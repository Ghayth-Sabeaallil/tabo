import { Link } from "react-router-dom";
import { MdApartment, MdOutlineVilla } from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { getAllActive, getAllUnActive } from "../Lib/getActive";
function MainFilter() {
    const [active, setActive] = useState<number>(0);
    const [unActive, setUnActive] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            setUnActive(await getAllUnActive());
            setActive(await getAllActive());
        };
        fetchData();
    }, []);

    return (
        <div className="animate-[animation_1s_ease-in] flex flex-col justify-center items-center h-full gap-10 mb-4 mt-4">
            <h1 className="text-5xl text-header font-Amiri font-bold ">مرحبا بكم في طاپو</h1>
            <a aria-label="تواصل مع الموقع" href={`https://wa.me/963xxxxxxxx`}><div className="border-2 border-header bg-[#25D366] text-white text-2xl sm:text-2xl flex justify-center items-center gap-4 font-Amiri md:text-3xl font-extrabold p-2 rounded-xl"><p>تواصل معنا للاعلان</p><svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#fff"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#fff"></path> </g></svg></div></a>
            <div className="flex w-3/5 sm:w-2/5 md:w-2/5 gap-2 flex-wrap">
                <Link className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold" to={"/apartments"}><MdApartment size={40} color="#BA9503" />شقق</Link>
                <Link to={"/farms"} className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold" ><PiFarm size={40} color="#BA9503" />أراضي</Link>
                <Link to={"/shops"} className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold"><CiShop size={40} color="#BA9503" />محال</Link>
                <Link to={"/villas"} className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold"><MdOutlineVilla size={40} color="#BA9503" />فلل</Link>
            </div>
            <div className="flex flex-col sm:flex-col md:flex-row gap-10 justify-between items-center">
                <div className="flex flex-col gap-2 items-center font-Amiri font-black ">
                    <p className="text-4xl text-header">المتواجد الآن</p>
                    <CountUp className="text-8xl" end={3746} duration={5} delay={1} />
                </div>
                <div className="flex flex-col gap-2 items-center text-4xl font-Amiri font-black ">
                    <p className="text-4xl text-header">المباع</p>
                    <CountUp className="text-8xl" end={864} duration={5} delay={1} />
                </div>
            </div>
        </div>
    )
}

export default MainFilter
/*                <DropDownMenu options={types} onSelect={(option) => setType(String(option))} placeHolder={"نوع العقار"} />
*/