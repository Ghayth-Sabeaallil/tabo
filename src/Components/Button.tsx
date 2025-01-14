export type ButtonProps = {
    text: string;
    handleClick?: React.MouseEventHandler;
};
function Button({ text, handleClick }: ButtonProps) {
    return (
        <button onClick={handleClick} className="animate-[animation_2s_ease-in] text-base sm:text-base md:text-2xl backdrop-blur-sm bg-transparent p-3  text-white font-Amiri font-bold leading-[1.45] border hover:bg-[length:100%_100%] hover:text-black border-l-0 border-r-0 bg-no-repeat bg-gradient-to-b from-[#fff] to-[#fff] bg-[position:50%_50%] bg-[length:0%_100%] transition-[background-size,color] duration-700 w-fit">{text}</button>)
}

export default Button