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
                birthday: formatDate(user.birthday) || "",
                role: user.role || "USER",
            });
        }
    }, [user]);

    // 🛠 Hàm chuyển đổi định dạng ngày tháng "dd/MM/yyyy" => "yyyy-MM-dd"
    const formatDate = (dateString) => {
        if (!dateString) return ""; // Nếu không có ngày sinh, trả về rỗng
        const parts = dateString.split("/"); // Tách chuỗi theo dấu `/`
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`; // Trả về định dạng yyyy-MM-dd
        }
        return dateString; // Nếu không đúng định dạng, giữ nguyên
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.gender ||
            !formData.birthday
        ) {
            alert("⚠️ Vui lòng điền đầy đủ thông tin!");
            return;
        }

        console.log("📢 Dữ liệu gửi lên:", formData); // Debug dữ liệu gửi lên API

        if (user) {
            await updateUser(user.id, formData);
            alert("✅ Cập nhật thành công!");
        } else {
            await addUser(formData);
            alert("✅ Thêm người dùng thành công!");
        }

        onClose(); // Đóng modal sau khi thêm/cập nhật
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
