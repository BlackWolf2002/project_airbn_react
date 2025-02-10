import React, { useState, useEffect } from "react";

const RoomForm = ({ initialData = {}, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(
        initialData || { tenPhong: "", moTa: "", giaTien: "" }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-overlay">
            <form onSubmit={handleSubmit}>
                <h2>Thêm hoặc chỉnh sửa phòng</h2>
                <label>Tên phòng</label>
                <input
                    name="tenPhong"
                    value={formData.tenPhong || ""}
                    onChange={handleChange}
                    placeholder="Nhập tên phòng"
                />
                <label>Mô tả</label>
                <textarea
                    name="moTa"
                    value={formData.moTa || ""}
                    onChange={handleChange}
                    placeholder="Nhập mô tả"
                />
                <label>Giá phòng</label>
                <input
                    type="number"
                    name="giaTien"
                    value={formData.giaTien || ""}
                    onChange={handleChange}
                    placeholder="Nhập giá phòng"
                />
                <button type="submit">Lưu</button>
                <button type="button" onClick={onClose}>
                    Hủy
                </button>
            </form>
        </div>
    );
};

export default RoomForm;
