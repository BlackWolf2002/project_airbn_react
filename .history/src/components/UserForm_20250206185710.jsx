import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../api/userService";
import "../style/Modal.css";

const UserForm = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        birthday: "",
        role: "USER",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                gender: user.gender || "",
                birthday: user.birthday || "",
                role: user.role || "USER",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            await updateUser(user.id, formData);
        } else {
            await addUser(formData);
        }
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{user ? "Cập nhật người dùng" : "Thêm người dùng"}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>Tên người dùng:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Số điện thoại:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label>Giới tính:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>

                    <label>Ngày sinh:</label>
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />

                    <label>Chức vụ:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit">
                            {user ? "Cập nhật" : "Thêm người dùng"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
