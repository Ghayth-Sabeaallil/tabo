import { CardDetailsProps } from "../Lib/DataType";

const Card = ({ description, images, prise, area }: CardDetailsProps) => {
    return (
        <div className="items-center justify-start border-2 border-[#BA9503] grid grid-cols-5 gap-2 p-2 rounded-lg bg-[#569e4c] hover:bg-[#37822c] hover:scale-95">
            <div className="col-span-3 font-Amiri text-xl sm:text-base md:text-2xl p-2">
                <div className="flex flex-col items-start justify-end ">
                    <p className="line-clamp-2">{description}</p>
                    <p>المساحة: <span className="font-black text-2xl">{area}</span> متر مربع</p>
                    <p>السعر: <span className="font-black text-2xl">{prise}</span> ل.س</p>
                </div>
            </div>
            <div className="flex items-center justify-center col-span-2">{images && <img className="rounded-lg border-4 border-[#BA9503]" src={images![0]} alt="primaryImage" />}</div>
        </div>
    );
};

export default Card;
