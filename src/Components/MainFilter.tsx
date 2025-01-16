import { useState } from "react";
import DropDownMenu from "./DropDownMenu";
import Button from "./Button";
import { Link } from "react-router-dom";
import { MdApartment, MdOutlineVilla } from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
function MainFilter() {
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
        <div className="flex flex-col justify-center items-center h-full bg-[#d2f2ce] gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2">
                <div className="flex flex-col sm:flex-col md:flex-row gap-2">
                    <div className="bg-[#0D5C02] p-4 rounded-lg hover:bg-[#37822c] border-2 border-[#BA9503] cursor-pointer flex flex-col justify-center items-center text-[#BA9503] font-semibold"><MdApartment size={40} color="#BA9503" />شقق</div>
                    <div className="bg-[#0D5C02] p-4 rounded-lg hover:bg-[#37822c] border-2 border-[#BA9503] cursor-pointer flex flex-col justify-center items-center text-[#BA9503] font-semibold"><PiFarm size={40} color="#BA9503" />أراضي</div>
                </div>
                <div className="flex flex-col sm:flex-col md:flex-row gap-2">
                    <div className="bg-[#0D5C02] p-4 rounded-lg hover:bg-[#37822c] border-2 border-[#BA9503] cursor-pointer flex flex-col justify-center items-center text-[#BA9503] font-semibold"><CiShop size={40} color="#BA9503" />محال</div>
                    <div className="bg-[#0D5C02] p-4 rounded-lg hover:bg-[#37822c] border-2 border-[#BA9503] cursor-pointer flex flex-col justify-center items-center text-[#BA9503] font-semibold"><MdOutlineVilla size={40} color="#BA9503" />فلل</div></div>
            </div>
            <div className="flex flex-col gap-10 w-3/5 sm:w-2/5 md:w-2/5">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                    <DropDownMenu options={citys} onSelect={(option) => setCity(String(option))} placeHolder={"المدينة"} />
                    <DropDownMenu options={minRooms} onSelect={(option) => setRoom(Number(option))} placeHolder={"الحد الأقصى للغرف"} />
                    <DropDownMenu options={minPrise} onSelect={(option) => setPrice(Number(option))} placeHolder={"الحد الأقصى للسعر"} />
                    <DropDownMenu options={minArea} onSelect={(option) => setArea(Number(option))} placeHolder={"الحد الأقصى للمساحة"} />
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
                    <Button text={"بحث"} />
                </Link></div>

        </div>
    )
}

export default MainFilter
/*                <DropDownMenu options={types} onSelect={(option) => setType(String(option))} placeHolder={"نوع العقار"} />
*/