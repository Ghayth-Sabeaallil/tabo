import { useState } from 'react';

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
import { MdAddHomeWork } from 'react-icons/md';
import Button from './Button';
import { IoCloseCircle } from 'react-icons/io5';
import { Dialog } from '@headlessui/react';
import { IoIosSend } from 'react-icons/io';
import { getFormattedDate, post } from '../service/itemService';

export const AddItem = () => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [formData, setFormData] = useState<CardDetailsProps>({
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

    const citys: string[] = ["دمشق", "حلب", "حمص", "اللاذقية", "حماة", "دير الزور", "الرقة", "الحسكة", "طرطوس", "السويداء", "درعا", "القامشلي", "إدلب", "ريف دمشق"];
    const minRooms: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const types: string[] = ["شقة", "أرض", "محل", "فيلا"];


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const date = getFormattedDate();
        const username = document.cookie;
        const result = username.split("=")[1];
        await post(formData.city, formData.address, formData.description, formData.type, formData.area, formData.rooms, formData.price, formData.phone, formData.location, true, date, result);
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
        }); // Reset the form fields 
    };

    // Handle input and select changes
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        setFormData((prevData) => ({
            ...prevData,
            [name]: (name === "area" || name === "rooms" || name === "price" || name == "phone") ? Number(value) : value,
        }));
    };


    const openModal = () => setShowAddModal(true);

    function closeModal() {
        setShowAddModal(false);
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <Button handleClick={openModal} text={'اضافة عقار'} icon={<MdAddHomeWork size={20} />} />
            <Dialog open={showAddModal} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel
                        className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6"
                    >
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

                                <Button type="submit" text="تأكيد" icon={<IoIosSend size={20} />} />
                            </form>

                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}
