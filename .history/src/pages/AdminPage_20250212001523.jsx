import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom"; // Import Navigate
import AdminNavbar from "../components/AdminNavbar";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import "../style/Admin.css";

const AdminPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

    useEffect(() => {
        // Nếu đang ở /admin, tự động chuyển đến /admin/users
        if (location.pathname === "/admin") {
            window.location.replace("/admin/users");
        }
    }, [location]);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setShowForm(true);
    };

    return (
        <div className="admin-container">
            {/* Sidebar menu */}
            <AdminNavbar />

            {/* Nội dung trang admin */}
            <div className="admin-content">
                <h1 className="admin-title">Quản lý User</h1>

                {/* Nút thêm user */}
                <button className="add-user-button" onClick={handleAddUser}>
                    + Thêm người dùng
                </button>

                {/* Bảng danh sách user */}
                <UserTable onEdit={handleEdit} />

                {/* Form thêm/sửa user */}
                {showForm && (
                    <UserForm
                        user={selectedUser}
                        onClose={() => setShowForm(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;
