export type ButtonProps = {
    text: string;
    handleClick?: React.MouseEventHandler;
};
function Button({ text, handleClick }: ButtonProps) {
    return (
        <button onClick={handleClick} className="text-base sm:text-base md:text-base pl-4 pr-4 pt-2 pb-2 text-[#BA9503] border-2 border-[#BA9503] font-Amiri font-bold bg-[#0D5C02] rounded-lg hover:bg-[#37822c]">{text}</button>)
}

export default Button