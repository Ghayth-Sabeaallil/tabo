const Footer = () => {
    return (
        <footer className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 justify-around items-center mt-auto bg-[#0D5C02] bottom-0 p-3 gap-2">
            <div className="flex justify-center gap-4 items-center">
                <img src="/fb.svg" className="w-10 h-10 hover:scale-125 cursor-pointer" alt="fb" />
                <img src="/whatsapp.svg" className="w-10 h-10 hover:scale-125 cursor-pointer" alt="whatsapp" />
                <img src="/mail.svg" className="w-10 h-10 hover:scale-125 cursor-pointer" alt="mail" />
            </div>
            <div className="flex justify-center items-center font-mono text-[#BA9503] font-bold text-lg">Tabo, Inc. &copy; {new Date().getFullYear()}</div>
        </footer>
    );
};

export default Footer;
