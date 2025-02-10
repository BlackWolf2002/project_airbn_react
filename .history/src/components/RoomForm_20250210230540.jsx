import React, { useState } from "react";

const RoomForm = ({ initialData = {}, onSubmit }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Tên Phòng</label>
            <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
            />
            <label>Mô Tả</label>
            <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
            />
            <label>Giá Phòng</label>
            <input
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
            />
            <button type="submit">Lưu</button>
        </form>
    );
};

export default RoomForm;
