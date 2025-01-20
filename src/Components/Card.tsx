type CardDetailsProps = {
    address?: string,
    images?: string[],
    price?: string,
    area?: number,
};

const Card = ({ address, images, price, area }: CardDetailsProps) => {
    return (
        <>
            <div className="relative w-full h-full border-2 border-text grid grid-rows-2 p-1 rounded-lg bg-card hover:bg-hoverBg hover:scale-95">
                {images && <img className="object-cover w-full h-40 rounded-lg border-4 border-text" src={images![0]} alt="primaryImage" />}
                <div className=" relative font-Amiri text-xl gap-4 sm:text-base md:text-2xl flex flex-col items-start justify-center text-text p-4">
                    <p className="overflow-y-auto h-15">{address}</p>
                    <p>المساحة: <span className="text-2xl">{area}</span> متر مربع</p>
                    <p>السعر: <span className="text-2xl">{price}</span> ل.س</p>
                </div>

            </div>
        </>

    );
};

export default Card;
