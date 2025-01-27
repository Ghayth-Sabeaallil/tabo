import { FaSearch } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";

type ButtonProps = {
    text: string;
    type?: "submit" | "button" | "reset";
    handleClick?: React.MouseEventHandler;
};
function Button({ text, handleClick, type }: ButtonProps) {
    return (
        <button type={type} onClick={handleClick} className={`text-base sm:text-base md:text-base pl-4 pr-4 pt-2 pb-2 text-text border-2 border-text font-Amiri font-bold bg-dropDownBg rounded-lg hover:bg-hoverBg ${text == "بحث" ? "w-full" : "w-auto text-xl"} flex gap-2 justify-center items-center`}>{text}{text == "بحث" ? <FaSearch size={20} /> : <IoLogInOutline size={20} />}</button>)
}

export default Button