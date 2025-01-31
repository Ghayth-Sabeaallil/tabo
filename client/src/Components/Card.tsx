type CardDetailsProps = {
    city?: string,
    images?: string[],
    price?: string,
    area?: number,
    path?: string
};

const Card = ({ city, images, price, area, path }: CardDetailsProps) => {
    return (
        <>
            <div className="relative w-full h-[400px] border-2 border-text grid grid-rows-2 p-1 rounded-lg bg-card hover:bg-hoverBg hover:scale-95">
                {images && <img loading="lazy" className="object-cover w-full h-[200px] object-cover rounded-lg border-4 border-text" src={images![0]} alt="primaryImage" />}
                <div className="relative font-Amiri text-base sm:text-base md:text-xl lg:text-xl flex flex-col items-start justify-around text-text pr-2">
                    <p>{city}</p>
                    <p>{area} {path == "farms" ? " دونم" : " متر مربع"}</p>
                    <p>{price} ل.س</p>
                </div>

            </div>
        </>

    );
};

export default Card; 
