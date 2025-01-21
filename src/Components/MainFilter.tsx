import { Link } from "react-router-dom";
import { MdApartment, MdOutlineVilla } from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
function MainFilter() {

    return (
        <div className="animate-[animation_1s_ease-in] flex flex-col justify-center items-center h-full gap-4">
            <div className="flex w-3/5 sm:w-2/5 md:w-2/5 gap-2 flex-wrap">
                <Link className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold" to={"/apartments"}><MdApartment size={40} color="#BA9503" />شقق</Link>
                <Link to={"/farms"} className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold" ><PiFarm size={40} color="#BA9503" />أراضي</Link>
                <Link to={"/shops"} className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold"><CiShop size={40} color="#BA9503" />محال</Link>
                <Link to={"/villas"} className="grow bg-buttom p-4 rounded-lg hover:bg-hoverBg border-2 border-text cursor-pointer flex flex-col justify-center items-center text-text font-semibold"><MdOutlineVilla size={40} color="#BA9503" />فلل</Link>
            </div>
        </div>
    )
}

export default MainFilter
/*                <DropDownMenu options={types} onSelect={(option) => setType(String(option))} placeHolder={"نوع العقار"} />
*/