import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type CarouselProps = {
    images: string[]; // Array of image URLs
};

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handlers for navigation
    const handleNext = () => {
        if (images.length > 0)
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        if (images.length > 0) {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
        }

    };

    // Open modal with the selected image
    const openModal = (index: number) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex">
            {/* Carousel */}
            <div className="relative w-full h-[16rem] sm:h-[20rem] md:h-[24rem] lg:h-[26rem] overflow-hidden rounded-md shadow-lg border border-4 border-header">

                {images.length > 0 && <IoIosArrowBack onClick={handleNext}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold bg-gray-700  rounded-full p-2 hover:bg-opacity-75 z-10 cursor-pointer" size={35} />}

                <img
                    src={images.length > 0 ? images[currentIndex] : "https://res.cloudinary.com/dornqibbw/image/upload/v1739056445/logo_q5d8tl.png"}
                    alt={`صورة رقم  ${currentIndex + 1}`}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => openModal(currentIndex)}
                />
                {images.length > 0 && <div className="absolute bottom-2 text-white text-2xl font-bold bg-gray-700 bg-opacity-90 p-2 z-10 select-none rounded-l-lg">{currentIndex + 1} / {images.length}</div>}
                {images.length > 0 && <IoIosArrowForward onClick={handlePrevious}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold bg-gray-700  rounded-full p-2 hover:bg-opacity-75 z-10 cursor-pointer" size={35} />}

            </div>

            {/* Full-Screen Modal */}
            {isModalOpen &&
                <>

                    <div className="fixed inset-0 bg-black bg-opacity-1 flex items-center justify-center z-50">
                        {images.length > 0 && <IoIosArrowBack onClick={handlePrevious}
                            className="absolute left-4 text-white text-3xl font-bold bg-gray-700 cursor-pointer rounded-full p-2 hover:bg-opacity-75" size={35} />}

                        <button
                            className="absolute top-4 right-4 text-white text-2xl font-bold"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                        <img
                            src={images.length > 0 ? images[currentIndex] : "https://res.cloudinary.com/dornqibbw/image/upload/v1739056445/logo_q5d8tl.png"}
                            alt={`Full Screen Slide ${currentIndex + 1}`}
                            className="w-auto h-1/3 md:h-5/6 sm:h-2/3 max-w-screen-lg object-contain rounded-md"
                        />
                        {images.length > 0 && <IoIosArrowForward onClick={handleNext}
                            className="absolute right-4 text-white text-3xl font-bold bg-gray-700 cursor-pointer rounded-full p-2 hover:bg-opacity-75" size={35} />}

                    </div>
                </>

            }
        </div>
    );
};