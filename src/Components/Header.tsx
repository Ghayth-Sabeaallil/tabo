import { useState } from "react";
import { FaHeadphones } from "react-icons/fa";
import { GoHome, } from "react-icons/go";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    return (
        <nav className="text-black font-bold shadow-xl bg-[#0D5C02] relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-3">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <a className="flex gap-2 justify-between items-center font-Amiri text-[#BA9503] text-6xl" href="/">طاپو <img className="w-14 h-14" src="./logo.svg" alt="logo" /></a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-4">
                        <Link to={"/about"}><div className="text-xl font-mono cursor-pointer p-3 text-[#BA9503] border-black font-bold duration-500 hover:scale-125 hover:font-extrabold flex gap-2">حول<IoMdInformationCircleOutline size={30} /></div></Link>
                        <Link to={"/contact"}><div className="text-xl font-mono cursor-pointer p-3 text-[#BA9503] border-black font-bold duration-500 hover:scale-125 hover:font-extrabold flex gap-2">تواصل معنا<FaHeadphones size={30} /></div></Link>
                        <Link to={"/"}>
                            <div className="text-xl font-mono cursor-pointer p-3 text-[#BA9503] border-black font-bold duration-500 hover:scale-125 hover:font-extrabold flex gap-2">الرئيسية<GoHome size={30} /></div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="focus:outline-none"
                        >
                            <svg
                                className="w-10 h-10"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    stroke="#BA9503"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {(isMobileMenuOpen && window.innerWidth < 768) && (
                <div className="w-screen absolute text-right z-50 flex flex-col items-end bg-[#0D5C02] pr-4">
                    <Link to={"/"}><div className="text-xl font-mono cursor-pointer p-3 text-[#BA9503] font-bold duration-500 flex gap-2 hover:scale-125">الرئيسية<GoHome size={30} /> </div></Link>
                    <Link to={"/contact"}><div className="text-xl font-mono cursor-pointer p-3 text-[#BA9503] font-bold duration-500 flex gap-2 hover:scale-125">تواصل معنا<FaHeadphones size={30} /></div></Link>
                    <Link to={"/about"}><div className="text-xl font-mono cursor-pointer p-3 text-[#BA9503] font-bold duration-500 flex gap-2 hover:scale-125">حول<IoMdInformationCircleOutline size={30} /></div></Link>

                </div>
            )}
        </nav>
    );
};

export default Header;
