import { useState, useRef, useEffect } from "react";
import { SlOptions } from "react-icons/sl";
import { deleteImages, deleteItem } from "../service/itemService";
import { CardDetailsProps } from "../Lib/DataType";

type DropdownProps = {
    _id: string;
    onItemDeleted: () => void


}

export default function Dropdown({ _id, onItemDeleted }: DropdownProps) {
    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handelDelete = async () => {
        const response: CardDetailsProps = await deleteItem(_id)
        deleteImages(response.images!);
        setOpen(false);
        onItemDeleted();
    }

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-full transition"
            >
                <SlOptions className="cursor-pointer mr-2" size={20} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-bg border border-header rounded-lg shadow-lg z-50">
                    <ul className="py-2 text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-header hover:text-text cursor-pointer rounded m-1" onClick={handelDelete}>
                            حذف
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
