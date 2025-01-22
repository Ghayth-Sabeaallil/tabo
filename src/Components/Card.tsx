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
            <div className="relative w-full h-full border-2 border-text grid grid-rows-5 p-1 rounded-lg bg-card hover:bg-hoverBg hover:scale-95">
                {images && <img loading="lazy" className="row-span-3 object-cover w-full h-full rounded-lg border-4 border-text" src={images![0]} alt="primaryImage" />}
                <div className="row-span-2 relative font-Amiri text-base gap-2 sm:text-base md:text-xl lg:text-xl flex flex-col items-start justify-around text-text pr-2">
                    <p>{city}</p>
                    <p>{area} {path == "farms" ? " دونم" : " متر مربع"}</p>
                    <p>{price} ل.س</p>
                </div>

            </div>
        </>

    );
};

export default Card;
