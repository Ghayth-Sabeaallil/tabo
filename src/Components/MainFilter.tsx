import { useState } from "react";
import DropDownMenu from "./DropDownMenu";
import Button from "./Button";
import { Link } from "react-router-dom";
function MainFilter() {
    const [minR, setMinR] = useState<number>(0);
    const [city, setCity] = useState<string>("");
    const [itemType, setItemType] = useState<string>("");
    const [minP, setMinP] = useState<number>(0);
    const [minA, setMinA] = useState<number>(0);


    const citys: string[] = ["دمشق", "حلب", "حمص", "اللاذقية", "حماة", "دير الزور", "الرقة", "الحسكة", "طرطوس", "السويداء", "درعا", "القامشلي", "إدلب", "ريف دمشق"];
    const minRooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const minPrise: number[] = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    const minArea: number[] = [10, 30, 50, 70, 90, 110];
    const type: string[] = ["شقة سكنية", "أرض", "فلا", "محل تجاري"];

    return (
        <div className="flex flex-col gap-4 justify-center items-center overflow-y-auto h-full bg-[#b5f0ad]">
            <DropDownMenu options={citys} onSelect={(option) => setCity(String(option))} placeHolder={"المدينة"} />
            <div className="flex gap-2">
                <DropDownMenu options={minRooms} onSelect={(option) => setMinR(Number(option))} placeHolder={"الحد الأدنى لعدد الغرف"} />
                <DropDownMenu options={minPrise} onSelect={(option) => setMinP(Number(option))} placeHolder={"الحد الأقصى للسعر"} />
            </div>
            <div className="flex gap-2">
                <DropDownMenu options={minArea} onSelect={(option) => setMinA(Number(option))} placeHolder={"الحد الأدنى للمساحة"} />
                <DropDownMenu options={type} onSelect={(option) => setItemType(String(option))} placeHolder={"نوع العقار"} />
            </div>
            <Link to={
                !city && !minR && !minP && !minA && !itemType
                    ? "/item" // No filters applied
                    : `/item?${[
                        city ? `city=${city}` : "",
                        minR ? `minR=${minR}` : "",
                        minP ? `minP=${minP}` : "",
                        minA ? `minA=${minA}` : "",
                        itemType ? `type=${itemType}` : "",
                    ]
                        .filter(Boolean) // Remove empty query parameters
                        .join("&")}` // Join applied filters with "&"
            }>
                <Button text={"تطبيق"} />
            </Link>

        </div>
    )
}

export default MainFilter