import React, { useState } from "react";
import { addUser, updateUser } from "../api/userService";
import "../styles/Admin.css";

const UserForm = ({ user, onClose, refreshUsers }) => {
    const [formData, setFormData] = useState(
        user || {
            username: "",
            email: "",
            birthday: "",
            role: "USER",
        }
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            await updateUser(user.id, formData);
        } else {
            await addUser(formData);
        }
        refreshUsers();
        onClose();
    };

    return (
        <div className="user-form">
            <h2>{user ? "Cập nhật User" : "Thêm User"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <button type="submit">Lưu</button>
            </form>
        </div>
    );
};

export default UserForm;
