import React from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Airbnb Clone</div>
            <div className="nav-links">
                <Link to="/Login">Đăng Nhập</Link>
                <Link to="./Login.jsx">Đăng Ký</Link>
            </div>
        </nav>
    );
};

export default Navbar;
