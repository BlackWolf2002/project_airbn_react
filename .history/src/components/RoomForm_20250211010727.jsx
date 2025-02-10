import React, { useState, useEffect } from "react";

const RoomForm = ({ initialData = {}, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(initialData || {}); // Đảm bảo giá trị khởi tạo không phải null

    useEffect(() => {
        setFormData(initialData || {}); // Cập nhật dữ liệu khi nhận prop mới
    }, [initialData]);

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
                <label>Tên Phòng</label>
                <input
                    name="tenPhong"
                    value={formData.tenPhong || ""} // Kiểm tra null/undefined
                    onChange={handleChange}
                    placeholder="Nhập tên phòng"
                />
                <label>Mô Tả</label>
                <textarea
                    name="moTa"
                    value={formData.moTa || ""} // Kiểm tra null/undefined
                    onChange={handleChange}
                    placeholder="Nhập mô tả"
                />
                <label>Giá Phòng</label>
                <input
                    type="number"
                    name="giaTien"
                    value={formData.giaTien || ""} // Kiểm tra null/undefined
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
