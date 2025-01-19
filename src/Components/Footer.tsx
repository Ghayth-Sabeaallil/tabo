import fetchApi from "../Lib/fetchApi";
import Button from "./Button";

const Footer = () => {
    return (
        <footer className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 justify-around items-center mt-auto bg-footer bottom-0 p-3 gap-2">
            <div className="flex justify-center gap-4 items-center">
                <img src="/fb.svg" className="w-10 h-10 hover:scale-125 cursor-pointer" alt="fb" />
                <img src="/whatsapp.svg" className="w-10 h-10 hover:scale-125 cursor-pointer" alt="whatsapp" />
                <img src="/mail.svg" className="w-10 h-10 hover:scale-125 cursor-pointer" alt="mail" />
                <Button handleClick={fetchApi} text={"Text API"} />
            </div>
            <div className="flex justify-center items-center font-mono text-text font-bold text-lg">Tabo, Inc. &copy; {new Date().getFullYear()}</div>


        </footer>
    );
};

export default Footer;
