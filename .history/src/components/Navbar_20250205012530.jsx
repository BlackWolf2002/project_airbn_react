import React from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Airbnb Clone</div>
            <div className="nav-links">
                <Link to="/login">Đăng Nhập</Link>
                <Link to="/register">Đăng Ký</Link>
            </div>
        </nav>
    );
};

export default Navbar;
