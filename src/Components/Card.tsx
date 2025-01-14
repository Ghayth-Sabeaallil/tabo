import { CardProps } from "../Lib/DataType";

const Card = ({ description, primaryImage, prise, area }: CardProps) => {
    return (
        <div className="items-center justify-center border-2 border-[#BA9503] grid grid-cols-5 gap-2 p-2 rounded-lg text-right bg-[#569e4c] hover:bg-[#37822c] hover:scale-95">
            <div className="flex items-center justify-center col-span-2">{primaryImage && <img className="rounded-lg border-4 border-[#BA9503]" src={primaryImage} alt="primaryImage" />}</div>
            <div className="col-span-3 font-Amiri text-xl sm:text-base md:text-2xl p-2">
                <div className="flex flex-col items-end justify-end ">
                    <p>{description}</p>
                    <p>المساحة: <span className="font-black text-2xl">{area}</span> متر مربع</p>
                    <p>السعر: <span className="font-black text-2xl">{prise}</span> ل.س</p>
                </div>

            </div>
        </div>
    );
};

export default Card;
