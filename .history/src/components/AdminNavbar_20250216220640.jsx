import React from "react";
import { Link } from "react-router-dom";
import "../style/Admin.css";

const AdminNavbar = () => {
    return (
        <div className="admin-navbar">
            <h2>Quản lý</h2>
            <ul>
                <li>
                    <Link to="/admin/users">Quản lý người dùng</Link>
                </li>
                <li>
                    <Link to="/admin/locations">Quản lý vị trí</Link>
                </li>
                <li>
                    <Link to="/admin/rooms">Quản lý Room</Link>
                </li>
                <li>
                    <Link to="/admin/bookings">Quản lý Booking</Link>
                </li>
                <li>
                    <Link to="/">Về Lại Trang Chủ</Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminNavbar;
