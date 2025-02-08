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
import { getLatLngFromUrl } from '../utils/getLanLngFromUrl';

type AddItemProps = {
    onItemAdded: () => void,
    user: string
}

export const AddItem = ({ onItemAdded, user }: AddItemProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [location, setLocation] = useState<string>("");
    const [description, setDes] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [city, setCity] = useState<string>("");

    const [price, setPrice] = useState<number | null>(null);
    const [area, setArea] = useState<number | null>(null);
    const [phone, setPhone] = useState<number | null>(null);
    const [rooms, setRooms] = useState<number | null>(null);


    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);

    const citys: string[] = ["دمشق", "حلب", "حمص", "اللاذقية", "حماة", "دير الزور", "الرقة", "الحسكة", "طرطوس", "السويداء", "درعا", "القامشلي", "إدلب", "ريف دمشق"];
    const minRooms: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const types: string[] = ["شقة", "أرض", "محل", "فيلا"];


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let latAndLng;
        if (location?.length > 0) {
            latAndLng = getLatLngFromUrl(location);
        }
        const date = getFormattedDate();
        await post(city, address, description, type, Number(area), Number(rooms), Number(price), Number(phone), latAndLng!, true, date, imageUrls);
        closeModal();
        setAddress("");
        setCity("");
        setDes("");
        setType("");
        setLocation("");
        setPhone(null);
        setArea(null);
        setRooms(null);
        setPrice(null);

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
                                        value={city}
                                        onChange={(e) => setCity(e.currentTarget.value)}
                                        className="w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl"
                                        required
                                    >
                                        <option value="" disabled className=''>
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
                                        value={address}
                                        onChange={(e) => setAddress(e.currentTarget.value)}
                                        placeholder="العنوان"
                                        className="w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl placeholder:opacity-50"
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
                                        value={price ?? ""}
                                        onChange={(e) => setPrice(Number(e.currentTarget.value))}
                                        placeholder="السعر"
                                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl placeholder:opacity-50"
                                        min={0}
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
                                        value={description}
                                        onChange={(e) => setDes(e.currentTarget.value)}
                                        placeholder="الوصف"
                                        className="w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl placeholder:opacity-50"
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
                                        value={area ?? ""}
                                        onChange={(e) => setArea(Number(e.currentTarget.value))}
                                        placeholder="المساحة"
                                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl placeholder:opacity-50"
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
                                        value={phone ?? ""}
                                        onChange={(e) => setPhone(Number(e.currentTarget.value))}
                                        placeholder="...963"
                                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl placeholder:opacity-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="location" className="text-header text-xl font-medium block font-Amir">
                                        الموقع
                                    </label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        value={location}
                                        onChange={(event) => setLocation(event.currentTarget.value)}
                                        placeholder="الموقع"
                                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 border-2 border-text rounded-lg mt-1 bg-header text-text placeholder-text text-xl placeholder:opacity-50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="rooms" className="text-header text-xl font-medium block font-Amir">
                                        عدد الغرف
                                    </label>
                                    <select
                                        id="rooms"
                                        name="rooms"
                                        value={rooms ?? ""}
                                        onChange={(e) => setRooms(Number(e.currentTarget.value))}
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
                                        value={type}
                                        onChange={(e) => setType(e.currentTarget.value)}
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
                                    <div className='flex justify-around items-center'>
                                        <input id="file-upload" type="file" onChange={handleFileChange} multiple className="text-header font-bold rounded w-[75%]" />
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
