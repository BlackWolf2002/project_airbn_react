import React, { useState } from "react";
import { addUser, updateUser } from "../api/userService";

export const UserForm = ({ user, onClose, refreshUsers }) => {
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
                <input type="text" name="username" placeholder="User" />
            </form>
        </div>
    );
};
