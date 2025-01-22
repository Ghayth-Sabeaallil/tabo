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
        <div className="animate-[animation_1s_ease-in] flex flex-col justify-around items-center h-full gap-4">
            <h1 className="text-5xl text-header font-Amiri font-bold ">مرحبا بكم في طابو</h1>
            <div className="flex w-3/5 sm:w-2/5 md:w-2/5 gap-2 flex-wrap">
                <Link className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold" to={"/apartments"}><MdApartment size={40} color="#BA9503" />شقق</Link>
                <Link to={"/farms"} className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold" ><PiFarm size={40} color="#BA9503" />أراضي</Link>
                <Link to={"/shops"} className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold"><CiShop size={40} color="#BA9503" />محال</Link>
                <Link to={"/villas"} className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold"><MdOutlineVilla size={40} color="#BA9503" />فلل</Link>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="flex flex-col gap-2 items-center font-Amiri font-bold ">
                    <p className="text-4xl text-header">المتواجد الآن</p>
                    <CountUp className="text-7xl" prefix="+" end={active} duration={5} delay={1} />
                </div>
                <div className="flex flex-col gap-2 items-center text-4xl font-Amiri font-bold ">
                    <p className="text-4xl text-header">المباع</p>
                    <CountUp className="text-7xl" prefix="+" end={unActive} duration={5} delay={1} />
                </div>
            </div>
        </div>
    )
}

export default MainFilter
/*                <DropDownMenu options={types} onSelect={(option) => setType(String(option))} placeHolder={"نوع العقار"} />
*/