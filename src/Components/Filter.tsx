import { useEffect, useRef, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import Button from "./Button";
import { Link, useLocation } from "react-router-dom";
import { MdApartment, MdOutlineVilla } from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { CiShop } from "react-icons/ci";

function Filter() {
    const url = useLocation();
    const searchParams = new URLSearchParams(url.search);
    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        paramsObj[key] = value;
    });

    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [room, setRoom] = useState<number>(paramsObj["room"] ? Number(paramsObj["room"]) : 0);
    const [city, setCity] = useState<string>(paramsObj["city"] ? `${paramsObj["city"]}` : "");
    const [type, setType] = useState<string>(paramsObj["type"] ? `${paramsObj["type"]}` : "");
    const [price, setPrice] = useState<number>(paramsObj["price"] ? Number(paramsObj["price"]) : 0);
    const [area, setArea] = useState<number>(paramsObj["area"] ? Number(paramsObj["area"]) : 0);

    const citys: string[] = ["دمشق", "حلب", "حمص", "اللاذقية", "حماة", "دير الزور", "الرقة", "الحسكة", "طرطوس", "السويداء", "درعا", "القامشلي", "إدلب", "ريف دمشق"];
    const minRooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const minPrice: number[] = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 1000];
    const minArea: number[] = [40, 60, 90, 120, 150, 200, 250, 350, 500];
    const dropdownMenu = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownMenu.current &&
                !dropdownMenu.current.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="text-black font-bold shadow-xl bg-bg bg-opacity-50">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 p-2">
                <div className="flex justify-center items-center h-fit">

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex gap-4 justify-center items-center">
                        <div className="hidden md:grid grid-cols-4 gap-4"> <DropDownMenu options={citys} onSelect={(option) => setCity(String(option))} placeHolder={paramsObj["city"] ? paramsObj["city"] : "المدينة"} />
                            <DropDownMenu options={minRooms} onSelect={(option) => setRoom(Number(option))} placeHolder={paramsObj["room"] ? paramsObj["room"] : "الحد الأقصى للغرف"} />
                            <DropDownMenu options={minPrice} onSelect={(option) => setPrice(Number(option))} placeHolder={paramsObj["price"] ? paramsObj["price"] : "الحد الأقصى للسعر"} type="price" />
                            <DropDownMenu options={minArea} onSelect={(option) => setArea(Number(option))} placeHolder={paramsObj["area"] ? paramsObj["area"] : "الحد الأقصى للمساحة"} type="area" /></div>
                        <div className="flex gap-2">
                            <div className="flex gap-2">
                                <div className={`bg-dropDownBg p-2 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "شقة" && "bg-hoverBg"}`} onClick={() => setType("شقة")}><MdApartment size={30} color="#BA9503" /></div>
                                <div className={`bg-dropDownBg p-2 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "أرض" && "bg-hoverBg"}`} onClick={() => setType("أرض")}><PiFarm size={30} color="#BA9503" /></div>
                            </div>
                            <div className="flex gap-2">
                                <div className={`bg-dropDownBg p-2 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "محل" && "bg-hoverBg"}`} onClick={() => setType("محل")}><CiShop size={30} color="#BA9503" /></div>
                                <div className={`bg-dropDownBg p-2 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "فيلا" && "bg-hoverBg"}`} onClick={() => setType("فيلا")}><MdOutlineVilla size={30} color="#BA9503" /></div></div>
                        </div>
                        <Button handleClick={() => { window.location.href = "/tabo/#/search"; window.location.reload() }} text={"إعادة ضبط"} />
                        <Link to={
                            !city && !room && !price && !area && !type
                                ? "/search" // No filters applied
                                : `/search?${[
                                    city ? `city=${city}` : "",
                                    room ? `room=${room}` : "",
                                    price ? `price=${price}` : "",
                                    area ? `area=${area}` : "",
                                    type ? `type=${type}` : "",
                                ]
                                    .filter(Boolean) // Remove empty query parameters
                                    .join("&")}` // Join applied filters with "&"
                        }>
                            <Button text={"بحث"} />
                        </Link>
                    </div>


                    {/* Mobile Menu Button */}
                    <div className="flex xl:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="focus:outline-none"
                        >
                            <svg
                                className="w-10 h-10 fill-icons stroke-icon"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.8258 5H6.17422C5.31987 5 4.85896 6.00212 5.41496 6.65079L9.75926 11.7191C9.91461 11.9004 10 12.1312 10 12.3699V17.382C10 17.7607 10.214 18.107 10.5528 18.2764L12.5528 19.2764C13.2177 19.6088 14 19.1253 14 18.382V12.3699C14 12.1312 14.0854 11.9004 14.2407 11.7191L18.585 6.65079C19.141 6.00212 18.6801 5 17.8258 5Z" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {(isMobileMenuOpen && window.innerWidth < 1270) && (
                <div ref={dropdownMenu} className="w-screen absolute z-50 flex flex-col justify-center items-center gap-4 bg-dropDownBg p-4">
                    <div className="grid grid-cols-2 w-full">
                        <DropDownMenu options={citys} onSelect={(option) => setCity(String(option))} placeHolder={paramsObj["city"] ? paramsObj["city"] : "المدينة"} />
                        <DropDownMenu options={minRooms} onSelect={(option) => setRoom(Number(option))} placeHolder={paramsObj["room"] ? paramsObj["room"] : "الحد الأقصى للغرف"} />
                    </div>
                    <div className="grid grid-cols-2 w-full">
                        <DropDownMenu options={minPrice} onSelect={(option) => setPrice(Number(option))} placeHolder={paramsObj["price"] ? paramsObj["price"] : "الحد الأقصى للسعر"} type="price" />
                        <DropDownMenu options={minArea} onSelect={(option) => setArea(Number(option))} placeHolder={paramsObj["area"] ? paramsObj["area"] : "الحد الأقصى للمساحة"} type="area" />
                    </div>
                    <div className="flex gap-2">
                        <div className="flex gap-2">
                            <div className={`bg-dropDownBg p-2 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "شقة" && "bg-hoverBg"}`} onClick={() => setType("شقة")}><MdApartment size={30} color="#BA9503" /></div>
                            <div className={`bg-dropDownBg p-2 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "أرض" && "bg-hoverBg"}`} onClick={() => setType("أرض")}><PiFarm size={30} color="#BA9503" /></div>
                        </div>
                        <div className="flex gap-2">
                            <div className={`bg-dropDownBg p-2 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "محل" && "bg-hoverBg"}`} onClick={() => setType("محل")}><CiShop size={30} color="#BA9503" /></div>
                            <div className={`bg-dropDownBg p-2 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "فيلا" && "bg-hoverBg"}`} onClick={() => setType("فيلا")}><MdOutlineVilla size={30} color="#BA9503" /></div></div>
                    </div>
                    <Link to={
                        !city && !room && !price && !area && !type
                            ? "/search" // No filters applied
                            : `/search?${[
                                city ? `city=${city}` : "",
                                room ? `room=${room}` : "",
                                price ? `price=${price}` : "",
                                area ? `area=${area}` : "",
                                type ? `type=${type}` : "",
                            ]
                                .filter(Boolean) // Remove empty query parameters
                                .join("&")}` // Join applied filters with "&"
                    }>
                        <Button handleClick={() => setMobileMenuOpen(!isMobileMenuOpen)} text={"بحث"} />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Filter