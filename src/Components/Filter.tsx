import { useState } from "react";
import DropDownMenu from "./DropDownMenu";
import Button from "./Button";
import { Link } from "react-router-dom";
function Filter() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [room, setRoom] = useState<number>(0);
    const [city, setCity] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [area, setArea] = useState<number>(0);

    const citys: string[] = ["دمشق", "حلب", "حمص", "اللاذقية", "حماة", "دير الزور", "الرقة", "الحسكة", "طرطوس", "السويداء", "درعا", "القامشلي", "إدلب", "ريف دمشق"];
    const minRooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const minPrise: number[] = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    const minArea: number[] = [10, 30, 50, 70, 90, 110];
    const types: string[] = ["شقة سكنية", "أرض", "فلا", "محل تجاري"];




    return (
        <div className="text-black font-bold shadow-xl bg-[#d2f2ce]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-2">
                <div className="flex justify-center items-center h-10">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-4">
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
                        <DropDownMenu options={citys} onSelect={(option) => setCity(String(option))} placeHolder={"المدينة"} />
                        <DropDownMenu options={minRooms} onSelect={(option) => setRoom(Number(option))} placeHolder={"الحد الأقصى للغرف"} />
                        <DropDownMenu options={minPrise} onSelect={(option) => setPrice(Number(option))} placeHolder={"الحد الأقصى للسعر"} />
                        <DropDownMenu options={minArea} onSelect={(option) => setArea(Number(option))} placeHolder={"الحد الأقصى للمساحة"} />
                        <DropDownMenu options={types} onSelect={(option) => setType(String(option))} placeHolder={"نوع العقار"} />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="focus:outline-none"
                        >
                            <svg
                                className="w-10 h-10"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.8258 5H6.17422C5.31987 5 4.85896 6.00212 5.41496 6.65079L9.75926 11.7191C9.91461 11.9004 10 12.1312 10 12.3699V17.382C10 17.7607 10.214 18.107 10.5528 18.2764L12.5528 19.2764C13.2177 19.6088 14 19.1253 14 18.382V12.3699C14 12.1312 14.0854 11.9004 14.2407 11.7191L18.585 6.65079C19.141 6.00212 18.6801 5 17.8258 5Z" stroke="#0D5C02" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {(isMobileMenuOpen && window.innerWidth < 768) && (
                <div className="w-screen absolute z-50 grid grid-cols-2 gap-4 bg-[#0D5C02] p-4">
                    <DropDownMenu options={citys} onSelect={(option) => setCity(String(option))} placeHolder={"المدينة"} />
                    <DropDownMenu options={minRooms} onSelect={(option) => setRoom(Number(option))} placeHolder={"الحد الأدنى للغرف"} />
                    <DropDownMenu options={minPrise} onSelect={(option) => setPrice(Number(option))} placeHolder={"الحد الأقصى للسعر"} />
                    <DropDownMenu options={minArea} onSelect={(option) => setArea(Number(option))} placeHolder={"الحد الأدنى للمساحة"} />
                    <DropDownMenu options={types} onSelect={(option) => setType(String(option))} placeHolder={"نوع العقار"} />
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
            )}
        </div>
    )
}

export default Filter