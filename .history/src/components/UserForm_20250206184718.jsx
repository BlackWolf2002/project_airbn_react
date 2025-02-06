import React, { useState, useEffect } from "react";
import "../style/Admin.css";

const UserForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        password: "", // Mật khẩu chỉ cần khi thêm mới
        gender: "", // Nam/Nữ
        birthday: "",
        role: "USER", // Mặc định user mới sẽ có role USER
    });

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id || "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="form-container">
            <h2>{user ? "Cập nhật người dùng" : "Thêm người dùng"}</h2>
            <form onSubmit={handleSubmit}>
                {user && (
                    <div className="form-group">
                        <label>Mã người dùng</label>
                        <input type="text" value={formData.id} disabled />
                    </div>
                )}
                <div className="form-group">
                    <label>* Tên người dùng</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>* Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>* Số điện thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                {!user && (
                    <div className="form-group">
                        <label>* Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>* Giới tính</label>
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
                </div>
                <div className="form-group">
                    <label>* Ngày sinh</label>
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>* Chức vụ</label>
                    <div className="radio-group">
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
                        onClick={onCancel}
                        className="cancel-btn"
                    >
                        Hủy
                    </button>
                    <button type="submit" className="save-btn">
                        {user ? "Cập nhật" : "Thêm người dùng"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
