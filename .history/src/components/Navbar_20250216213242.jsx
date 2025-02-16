import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // Lấy thông tin đăng nhập
import "../style/Home.css";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext); // Lấy user từ context
    const [currentUser, setCurrentUser] = useState(null);

    // Kiểm tra user từ localStorage khi tải trang
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setCurrentUser(storedUser); // Duy trì trạng thái đăng nhập
        }
    }, [user]);

    return (
        <div className="relative h-[770px]">
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

                    {/* Nếu đã đăng nhập -> Hiển thị Avatar + Tên */}
                    {currentUser ? (
                        <div className="flex items-center space-x-4">
                            <img
                                src="/img/user-avatar.png" // Avatar mặc định hoặc có thể thay bằng API user
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border"
                            />
                            <span className="text-white font-bold">
                                {currentUser.name}
                            </span>
                            <button
                                onClick={() => {
                                    localStorage.clear(); // Xóa localStorage khi logout
                                    logoutUser(); // Gọi hàm logout từ context
                                    setCurrentUser(null);
                                    window.location.reload(); // Load lại trang
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
