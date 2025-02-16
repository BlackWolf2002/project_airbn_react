import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";
import { useNavigate } from "react-router-dom";
import { searchLocations } from "../api/apiService";

const Navbar = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    // Danh sách ảnh từ thư mục public/img/
    const images = [
        "/img/pexels-ian-panelo-3571551.jpg",
        "/img/pexels-stijn-dijkstra-1306815-2583852.jpg",
        "/img/pexels-samkolder-2387866.jpg",
        "/img/pexels-oidonnyboy-3375116.jpg",
    ];

    return (
        <div className="relative h-[770px]">
            {/* Hiển thị hình ảnh thay vì video */}
            <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2 grid-rows-2 gap-0 z-0">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Background ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                ))}
            </div>

            {/* Nội dung Navbar */}
            <div className="relative z-10 h-full" id="header">
                <nav
                    className="flex justify-between p-5"
                    style={{
                        background: "rgba(255, 255, 255, 0.35)",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                        backdropFilter: "blur(3px)",
                        WebkitBackdropFilter: "blur(3px)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                    }}
                >
                    <div className="text-red-600 font-bold text-3xl hover:text-red-400 cursor-pointer my-2">
                        airbnb
                    </div>

                    <div className="nav-links flex space-x-4">
                        <Link to="/login" className="mx-2">
                            <div
                                className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
                                style={{
                                    background: "rgba(255, 255, 255, 0.35)",
                                    boxShadow:
                                        "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                                    backdropFilter: "blur(3px)",
                                    WebkitBackdropFilter: "blur(3px)",
                                    border: "1px solid rgba(255, 255, 255, 0.18)",
                                }}
                            >
                                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                                    Đăng Nhập
                                </span>
                            </div>
                        </Link>
                        <Link to="/register" className="mx-2">
                            <div
                                className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
                                style={{
                                    background: "rgba(255, 255, 255, 0.35)",
                                    boxShadow:
                                        "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                                    backdropFilter: "blur(3px)",
                                    WebkitBackdropFilter: "blur(3px)",
                                    border: "1px solid rgba(255, 255, 255, 0.18)",
                                }}
                            >
                                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                                    Đăng Ký
                                </span>
                            </div>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
