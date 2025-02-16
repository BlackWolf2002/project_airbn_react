import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../style/Home.css";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // Kiểm tra user từ localStorage khi tải trang
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setCurrentUser(storedUser); // Duy trì trạng thái đăng nhập
        }
    }, [user]);

    // Debug xem user hiện tại có role ADMIN hay không
    useEffect(() => {
        console.log("🔎 Kiểm tra user trong Navbar:", currentUser);
    }, [currentUser]);

    // Danh sách ảnh từ thư mục public/img/
    const images = [
        "/img/pexels-ian-panelo-3571551.jpg",
        "/img/pexels-stijn-dijkstra-1306815-2583852.jpg",
        "/img/pexels-samkolder-2387866.jpg",
        "/img/pexels-oidonnyboy-3375116.jpg",
    ];

    return (
        <div className="relative h-[770px]">
            {/* Hiển thị hình ảnh nền */}
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
                    {/* Logo */}
                    <div className="text-red-600 font-bold text-3xl hover:text-red-400 cursor-pointer my-2">
                        airbnb
                    </div>

                    {/* Nếu đã đăng nhập -> Hiển thị Avatar + Tên + Nút Admin (nếu có) */}
                    {currentUser ? (
                        <div className="flex items-center space-x-4">
                            <img
                                src={
                                    currentUser.avatar || "/img/user-avatar.png"
                                }
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border"
                            />
                            <span className="text-white font-bold">
                                {currentUser.name}
                            </span>

                            {/* Nếu là ADMIN -> Hiển thị nút "Trang Quản trị" */}
                            {currentUser.role === "ADMIN" && (
                                <button
                                    onClick={() => {
                                        console.log("✅ Chuyển hướng Admin");
                                        navigate("/admin/users"); // Điều hướng đến trang quản trị
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Trang Quản trị
                                </button>
                            )}

                            <button
                                onClick={() => {
                                    logoutUser(); // Xóa user khỏi context & localStorage
                                    setCurrentUser(null);
                                    navigate("/"); // Chuyển về Home
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        // Nếu chưa đăng nhập -> Hiển thị nút Đăng nhập / Đăng ký
                        <div className="nav-links flex space-x-4">
                            <Link to="/login" className="mx-2">
                                <button className="px-5 py-2 bg-gray-100 border rounded-lg text-gray-600 hover:bg-gray-300">
                                    Đăng Nhập
                                </button>
                            </Link>
                            <Link to="/register" className="mx-2">
                                <button className="px-5 py-2 bg-gray-100 border rounded-lg text-gray-600 hover:bg-gray-300">
                                    Đăng Ký
                                </button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
