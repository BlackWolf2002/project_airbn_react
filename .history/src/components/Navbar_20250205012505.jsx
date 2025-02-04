import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Airbnb Clone</div>
            <div className="nav-links">
                <Link to="./Login.jsx">Đăng Nhập</Link>
                <Link to="/register">Đăng Ký</Link>
            </div>
        </nav>
    );
};
