import { FaSearch } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";

export type ButtonProps = {
    text: string;
    handleClick?: React.MouseEventHandler;
};
function Button({ text, handleClick }: ButtonProps) {
    return (
        <button onClick={handleClick} className={`text-base sm:text-base md:text-base pl-4 pr-4 pt-2 pb-2 text-text border-2 border-text font-Amiri font-bold bg-dropDownBg rounded-lg hover:bg-hoverBg ${text == "بحث" ? "w-full" : "w-auto"} flex gap-2 justify-center`}>{text}{text == "بحث" ? <FaSearch /> : <GrClearOption />}</button>)
}

export default Button