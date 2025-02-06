import React, { useState, useEffect } from "react";
import "../style/Admin.css";

const UserForm = ({ onSubmit, onCancel, user }) => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        gender: "",
        birthday: "",
        role: "USER",
    });

    useEffect(() => {
        if (user) {
            setFormData({ ...user });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-container">
            <h2>{user ? "Cập nhật người dùng" : "Thêm người dùng"}</h2>
            <form onSubmit={handleSubmit} className="form-grid">
                {user && (
                    <div className="form-group">
                        <label>Mã người dùng</label>
                        <input type="text" value={formData.id} disabled />
                    </div>
                )}
                <div className="form-group">
                    <label>Tên người dùng *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Số điện thoại *</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Giới tính *</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Ngày sinh *</label>
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Chức vụ *</label>
                    <div className="role-options">
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="ADMIN"
                                checked={formData.role === "ADMIN"}
                                onChange={handleChange}
                            />
                            Admin
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="USER"
                                checked={formData.role === "USER"}
                                onChange={handleChange}
                            />
                            User
                        </label>
                    </div>
                </div>
                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Hủy
                    </button>
                    <button type="submit" className="submit-btn">
                        {user ? "Cập nhật" : "Thêm người dùng"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
