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
    const minRooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const minPrise: number[] = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 1000];
    const minArea: number[] = [40, 60, 90, 120, 150, 200, 250, 350, 500];

    return (
        <div className="flex flex-col justify-center items-center h-full bg-bg bg-opacity-50 gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2">
                <div className="flex flex-col sm:flex-col md:flex-row gap-2">
                    <div className={`bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "شقة" && "bg-hoverBg"}`} onClick={() => setType("شقة")}><MdApartment size={40} color="#BA9503" />شقق</div>
                    <div className={`bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "أرض" && "bg-hoverBg"}`} onClick={() => setType("أرض")}><PiFarm size={40} color="#BA9503" />أراضي</div>
                </div>
                <div className="flex flex-col sm:flex-col md:flex-row gap-2">
                    <div className={`bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "محل" && "bg-hoverBg"}`} onClick={() => setType("محل")}><CiShop size={40} color="#BA9503" />محال</div>
                    <div className={`bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold ${type === "فيلا" && "bg-hoverBg"}`} onClick={() => setType("فيلا")}><MdOutlineVilla size={40} color="#BA9503" />فلل</div></div>
            </div>
            <div className="flex flex-col gap-10 w-3/5 sm:w-2/5 md:w-2/5">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                    <DropDownMenu options={citys} onSelect={(option) => setCity(String(option))} placeHolder={"المدينة"} />
                    <DropDownMenu options={minRooms} onSelect={(option) => setRoom(Number(option))} placeHolder={"الحد الأقصى للغرف"} />
                    <DropDownMenu options={minPrise} onSelect={(option) => setPrice(Number(option))} placeHolder={"الحد الأقصى للسعر"} type="price" />
                    <DropDownMenu options={minArea} onSelect={(option) => setArea(Number(option))} placeHolder={"الحد الأقصى للمساحة"} type="area" />
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