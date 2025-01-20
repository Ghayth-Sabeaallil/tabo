import { useState } from "react";
import { FaHeadphones } from "react-icons/fa";
import { GoHome, } from "react-icons/go";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlinePolicy } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    return (
        <nav className="text-black font-bold shadow-xl bg-header relative z-50 ">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-3">
                <div className="flex justify-between items-center h-16">

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-4">
                        <Link to={"/"}>
                            <div className="text-xl font-mono cursor-pointer p-3 text-text border-black font-bold duration-500 hover:scale-125 hover:font-extrabold flex gap-2">الرئيسية<GoHome size={30} /></div>
                        </Link>
                        <Link to={"/contact"}><div className="text-xl font-mono cursor-pointer p-3 text-text border-black font-bold duration-500 hover:scale-125 hover:font-extrabold flex gap-2">تواصل معنا<FaHeadphones size={30} /></div></Link>
                        <Link to={"/about"}><div className="text-xl font-mono cursor-pointer p-3 text-text border-black font-bold duration-500 hover:scale-125 hover:font-extrabold flex gap-2">حول<IoMdInformationCircleOutline size={30} /></div></Link>
                        <Link to={"/privacyPolicy"}><div className="text-xl font-mono cursor-pointer p-3 text-text border-black font-bold duration-500 hover:scale-125 hover:font-extrabold flex gap-2">الشروط و الأحكام<MdOutlinePolicy size={30} /></div></Link>
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
                    <div className="flex-shrink-0">
                        <Link to={"/"}>
                            <a className="flex gap-2 justify-between items-center font-Amiri text-[#BA9503] text-6xl">طاپو <svg width="800px" height="800px" viewBox="0 0 1024 1024" className="w-14 h-14" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">

                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                                <g id="SVGRepo_iconCarrier">

                                    <path d="M981.4 502.3c-9.1 0-18.3-2.9-26-8.9L539 171.7c-15.3-11.8-36.7-11.8-52 0L70.7 493.4c-18.6 14.4-45.4 10.9-59.7-7.7-14.4-18.6-11-45.4 7.7-59.7L435 104.3c46-35.5 110.2-35.5 156.1 0L1007.5 426c18.6 14.4 22 41.1 7.7 59.7-8.5 10.9-21.1 16.6-33.8 16.6z" fill="#BA9503" />

                                    <path d="M810.4 981.3H215.7c-70.8 0-128.4-57.6-128.4-128.4V534.2c0-23.5 19.1-42.6 42.6-42.6s42.6 19.1 42.6 42.6v318.7c0 23.8 19.4 43.2 43.2 43.2h594.8c23.8 0 43.2-19.4 43.2-43.2V534.2c0-23.5 19.1-42.6 42.6-42.6s42.6 19.1 42.6 42.6v318.7c-0.1 70.8-57.7 128.4-128.5 128.4z" fill="#BA9503" />

                                </g>

                            </svg></a>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {(isMobileMenuOpen && window.innerWidth < 768) && (
                <div className="w-screen absolute z-50 flex flex-col items-start bg-header pr-4">
                    <Link to={"/"}><div className="text-xl font-mono cursor-pointer p-3 text-text font-bold duration-500 flex gap-2 hover:scale-125">الرئيسية<GoHome size={30} /> </div></Link>
                    <Link to={"/contact"}><div className="text-xl font-mono cursor-pointer p-3 text-text font-bold duration-500 flex gap-2 hover:scale-125">تواصل معنا<FaHeadphones size={30} /></div></Link>
                    <Link to={"/about"}><div className="text-xl font-mono cursor-pointer p-3 text-text font-bold duration-500 flex gap-2 hover:scale-125">حول<IoMdInformationCircleOutline size={30} /></div></Link>
                    <Link to={"/privacyPolicy"}><div className="text-xl font-mono cursor-pointer p-3 text-text border-black font-bold duration-500 hover:scale-125 hover:font-extrabold flex gap-2">الشروط و الأحكام<MdOutlinePolicy size={30} /></div></Link>
                </div>
            )}
        </nav>
    );
};

export default Header;
