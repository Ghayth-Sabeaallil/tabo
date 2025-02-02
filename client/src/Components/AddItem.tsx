import { useState } from 'react';
import { MdAddHomeWork } from 'react-icons/md';
import Button from './Button';
import { IoCloseCircle } from 'react-icons/io5';
import { Dialog } from '@headlessui/react';
import { IoIosSend } from 'react-icons/io';
import { post } from '../service/itemService';
import { getFormattedDate } from '../utils/dateFormat';
import { uploadImageToCloudinary } from '../Lib/uploadFile';
import { SyncLoader } from 'react-spinners';

interface CardDetailsProps {
    description: string;
    address: string;
    price: number;
    rooms: number;
    phone: number;
    location: { lat: number; lng: number };
    city: string;
    area: number;
    type: string;
}

type AddItemProps = {
    onItemAdded: () => void,
    user: string
}

export const AddItem = ({ onItemAdded, user }: AddItemProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [formData, setFormData] = useState<CardDetailsProps>({
        description: "",
        address: "",
        price: 0,
        rooms: 0,
        phone: 963,
        location: { lat: 0, lng: 0 },
        city: "",
        area: 0,
        type: "",
    });

    const citys: string[] = ["دمشق", "حلب", "حمص", "اللاذقية", "حماة", "دير الزور", "الرقة", "الحسكة", "طرطوس", "السويداء", "درعا", "القامشلي", "إدلب", "ريف دمشق"];
    const minRooms: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const types: string[] = ["شقة", "أرض", "محل", "فيلا"];


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const date = getFormattedDate();
        await post(formData.city, formData.address, formData.description, formData.type, formData.area, formData.rooms, formData.price, formData.phone, formData.location, true, date, imageUrls);
        closeModal();
        setFormData({
            description: "",
            address: "",
            price: 0,
            rooms: 0,
            phone: 0,
            location: { lat: 0, lng: 0 },
            city: "",
            area: 0,
            type: "",
        });
        setImageUrls([]);
        onItemAdded();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(Array.from(event.target.files));
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        setLoading(true);
        const urls: string[] = [];
        for (const file of selectedFiles) {
            const url = await uploadImageToCloudinary(file, user);
            if (url) {
                urls.push(url);
            }
        }
        setImageUrls(urls);
        setLoading(false);
        onItemAdded();
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;
        setFormData((prevData) => {
            if (name === "lat" || name === "lng") {
                return {
                    ...prevData,
                    location: {
                        ...prevData.location,
                        [name]: Number(value), // Ensure lat/lng are numbers
                    },
                };
            }

            return {
                ...prevData,
                [name]: (name === "area" || name === "rooms" || name === "price" || name === "phone")
                    ? Number(value)
                    : value,
            };
        });
    };



    const openModal = () => setShowAddModal(true);

    function closeModal() {
        setShowAddModal(false);
    }
    return (
        <div>
            <Button handleClick={openModal} text={'اضافة عقار'} icon={<MdAddHomeWork size={20} />} />
            <Dialog open={showAddModal} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-bg bg-opacity-10">
                    <Dialog.Panel className="bg-bg rounded-xl shadow-xl w-full max-w-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-xl font-semibold">اضافة عقار</Dialog.Title>
                            <Button handleClick={closeModal} text={'اغلاق'} icon={<IoCloseCircle size={20} />} />

                        </div>

                        <div className="h-64 overflow-y-auto overscroll-contain">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="city" className="text-header text-xl font-medium block font-Amir">
                                        المدينة
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                        required
                                    >
                                        <option value="" disabled>
                                            المدينة
                                        </option>
                                        {citys.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="address" className="text-header text-xl font-medium block font-Amir">
                                        العنوان
                                    </label>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="العنوان"
                                        className="w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="price" className="text-header text-xl font-medium block font-Amir">
                                        السعر
                                    </label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="السعر"
                                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                        min={1}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="text-header text-xl font-medium block font-Amir">
                                        الوصف
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="الوصف"
                                        className="w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="area" className="text-header text-xl font-medium block font-Amir">
                                        المساحة
                                    </label>
                                    <input
                                        id="area"
                                        name="area"
                                        type="number"
                                        value={formData.area}
                                        onChange={handleChange}
                                        placeholder="المساحة"
                                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="text-header text-xl font-medium block font-Amir">
                                        الهاتف
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="number"
                                        step="any"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="963"
                                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                        required
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <div>
                                        <label htmlFor="lng" className="text-header text-xl font-medium block font-Amir">
                                            lng
                                        </label>
                                        <input
                                            id="lng"
                                            name="lng"
                                            type="number"
                                            step="any"
                                            value={formData.location.lng}
                                            onChange={handleChange}
                                            placeholder="Longitude"
                                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lat" className="text-header text-xl font-medium block font-Amir">
                                            lat
                                        </label>
                                        <input
                                            id="lat"
                                            name="lat"
                                            type="number"
                                            value={formData.location.lat}
                                            onChange={handleChange}
                                            placeholder="Latitude"
                                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="rooms" className="text-header text-xl font-medium block font-Amir">
                                        عدد الغرف
                                    </label>
                                    <select
                                        id="rooms"
                                        name="rooms"
                                        value={formData.rooms}
                                        onChange={handleChange}
                                        className="w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                        required
                                    >
                                        <option value="" disabled>
                                            عدد الغرف
                                        </option>
                                        {minRooms.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="type" className="text-header text-xl font-medium block font-Amir">
                                        نوع العقار
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                        required
                                    >
                                        <option value="" disabled>
                                            نوع العقار
                                        </option>
                                        {types.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex flex-col justify-center items-center gap-3'>
                                    <div className='flex justify-center items-center'>
                                        <input id="file-upload" type="file" onChange={handleFileChange} multiple className="text-header font-bold py-2 px-4 rounded" />
                                        <div onClick={handleUpload} className={`text-base sm:text-base md:text-base p-2 text-text border-2 border-text font-Amiri font-bold bg-dropDownBg rounded-lg hover:bg-hoverBg flex gap-2 justify-center items-center cursor-pointer select-none`}>
                                            {loading ? <SyncLoader
                                                color={"#BA9503"}
                                                loading={true}
                                                size={5}
                                                aria-label="Loading Spinner"
                                                data-testid="SyncLoader"
                                            /> : 'رفع الصور'}
                                        </div>
                                    </div>
                                    <div className="flex gap-1 justify-start w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2">
                                        {imageUrls && (
                                            imageUrls.map((img, index) => (
                                                <img key={index} src={img} alt="Uploaded" width="100" className="h-24 rounded border border-header border-2" />
                                            ))
                                        )}
                                    </div>
                                </div>
                                <div className='flex justify-center'>
                                    <Button type="submit" text="تأكيد" icon={<IoIosSend size={20} />} />
                                </div>
                            </form>

                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}
