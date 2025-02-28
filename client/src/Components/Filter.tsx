import { useState } from "react";
import DropDownMenu from "./DropDownMenu";
import Button from "./Button";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

type FilterProps = {
    path: string;
};
function Filter({ path }: FilterProps) {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [room, setRoom] = useState<number>(0);
    const [city, setCity] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [area, setArea] = useState<number>(0);

    const citys: string[] = ["جميع المحافظات", "دمشق", "حلب", "حمص", "اللاذقية", "حماة", "دير الزور", "الرقة", "الحسكة", "طرطوس", "السويداء", "درعا", "القامشلي", "إدلب", "ريف دمشق"];
    const minRooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const minPrice: number[] = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 1000, 2000];
    const minArea: number[] = [40, 60, 90, 120, 150, 200, 250, 350, 500, 1000];
    const minAreaFarm: number[] = [1, 3, 5, 7, 9, 15, 20, 50, 100];

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    return (
        <div className="text-black font-bold">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 p-2">
                <div className="flex justify-center items-center h-fit">

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex gap-4 justify-center items-center">
                        <div className={`hidden md:grid ${path == "villas" || path == "apartments" ? "grid-cols-4" : "grid-cols-3"} gap-4`}>
                            <DropDownMenu options={citys} onSelect={(option) => setCity(String(option))} placeHolder={"المحافظة"} />

                            {(path == "villas" || path == "apartments") && <DropDownMenu options={minRooms} onSelect={(option) => setRoom(Number(option))} placeHolder={"عدد الغرف"} />}

                            <DropDownMenu options={minPrice} onSelect={(option) => setPrice(Number(option))} placeHolder={"السعر"} type="price" />
                            <DropDownMenu options={path == "farms" ? minAreaFarm : minArea} onSelect={(option) => setArea(Number(option))} placeHolder={"المساحة"} type="area" path={path} />
                        </div>
                        <Link to={
                            !city && !room && !price && !area
                                ? `/${path}` // No filters applied
                                : `/${path}?${[
                                    city ? `city=${city}` : "",
                                    room ? `room=${room}` : "",
                                    price ? `price=${price}` : "",
                                    area ? `area=${area}` : "",
                                ]
                                    .filter(Boolean) // Remove empty query parameters
                                    .join("&")}` // Join applied filters with "&"
                        }>
                            <Button text={"بحث"} icon={<FaSearch size={20} />} />
                        </Link>
                    </div>


                    {/* Mobile Menu Button */}
                    <div className="flex xl:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="focus:outline-none"
                        >
                            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4.2673 6.24223C2.20553 4.40955 3.50184 1 6.26039 1H17.7396C20.4981 1 21.7945 4.40955 19.7327 6.24223L15.3356 10.1507C15.1221 10.3405 15 10.6125 15 10.8981V21.0858C15 22.8676 12.8457 23.7599 11.5858 22.5L9.58578 20.5C9.21071 20.1249 8.99999 19.6162 8.99999 19.0858V10.8981C8.99999 10.6125 8.87785 10.3405 8.66436 10.1507L4.2673 6.24223ZM6.26039 3C5.34088 3 4.90877 4.13652 5.59603 4.74741L9.99309 8.6559C10.6336 9.22521 11 10.0412 11 10.8981V19.0858L13 21.0858V10.8981C13 10.0412 13.3664 9.22521 14.0069 8.6559L18.404 4.74741C19.0912 4.13652 18.6591 3 17.7396 3H6.26039Z" fill="#4E342E"></path> </g></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {(isMobileMenuOpen && window.innerWidth < 1270) && (
                <div className="w-screen absolute z-40 flex flex-col justify-center items-center gap-4 bg-dropDownBg p-4">
                    <div className={`grid ${path == "villas" || path == "apartments" ? "grid-cols-2" : "grid-cols-1"} w-full`}>
                        <DropDownMenu options={citys} onSelect={(option) => setCity(String(option))} placeHolder={queryParams.get('city') ? queryParams.get('city')! : "المحافظة"} />
                        {(path == "villas" || path == "apartments") && <DropDownMenu options={minRooms} onSelect={(option) => setRoom(Number(option))} placeHolder={queryParams.get('room') ? queryParams.get('room')! : "عدد الغرف"} />}
                    </div>
                    <div className="grid grid-cols-2 w-full">
                        <DropDownMenu options={minPrice} onSelect={(option) => setPrice(Number(option))} placeHolder={queryParams.get('price') ? queryParams.get('price')! : "السعر"} type="price" />
                        <DropDownMenu options={path == "farms" ? minAreaFarm : minArea} onSelect={(option) => setArea(Number(option))} placeHolder={queryParams.get('area') ? queryParams.get('area')! : "المساحة"} type="area" path={path} />
                    </div>
                    <Link to={
                        !city && !room && !price && !area
                            ? `/${path}` // No filters applied
                            : `/${path}?${[
                                city ? `city=${city}` : "",
                                room ? `room=${room}` : "",
                                price ? `price=${price}` : "",
                                area ? `area=${area}` : "",
                            ]
                                .filter(Boolean) // Remove empty query parameters
                                .join("&")}` // Join applied filters with "&"
                    }>
                        <Button handleClick={() => setMobileMenuOpen(!isMobileMenuOpen)} text={"بحث"} icon={<FaSearch size={20} />} />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Filter