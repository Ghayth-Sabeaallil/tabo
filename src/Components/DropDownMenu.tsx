import React, { useState } from "react";

interface DropDownMenuProps {
    options: string[] | number[];
    onSelect: (option: string | number) => void;
    placeHolder: string,
    type?: string
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ options, onSelect, placeHolder, type }: DropDownMenuProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | number | null>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option: string | number) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="relative inline-block font-extrabold text-xl">
            {/* Dropdown Button */}
            <button
                onClick={toggleMenu}
                className="flex justify-between items-center w-full p-2 text-lg font-bold font-medium bg-dropDownBg border border-[#BA9503] rounded-md hover:bg-hoverBg text-[#BA9503] font-Amiri gap-4"
            >
                {selectedOption || placeHolder}
                <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                        stroke="#BA9503"
                    />
                </svg>
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <ul className="absolute z-10 w-full mt-2 bg-white border border-[#BA9503] rounded-md shadow-lg overflow-y-auto h-40">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        >
                            {option}{type === "area" ? " م2" : type === "price" ? " مليون" : ""}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropDownMenu;
