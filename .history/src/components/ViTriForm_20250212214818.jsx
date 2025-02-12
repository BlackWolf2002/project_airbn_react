import React, { useState, useEffect } from "react";
import {
    addLocation,
    updateLocation,
    uploadLocationImage,
} from "../api/locationService.js";

const ViTriForm = ({ isOpen, onClose, locationData, setLocations }) => {
    const [form, setForm] = useState({
        tenPhong: "",
        tinhThanh: "",
        quocGia: "",
        hinhAnh: "",
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (locationData) {
            setForm(locationData);
        }
    }, [locationData]);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedLocation;
            if (locationData) {
                updatedLocation = await updateLocation(locationData.id, form);
            } else {
                updatedLocation = await addLocation(form);
            }
            setLocations((prev) =>
                locationData
                    ? prev.map((loc) =>
                          loc.id === updatedLocation.id ? updatedLocation : loc
                      )
                    : [...prev, updatedLocation]
            );
            onClose();
        } catch (error) {
            console.error("Lỗi khi lưu vị trí:", error);
        }
    };

    const handleImageUpload = async () => {
        if (!imageFile) return;
        try {
            const imageUrl = await uploadLocationImage(form.id, imageFile);
            setForm({ ...form, hinhAnh: imageUrl });
        } catch (error) {
            console.error("Lỗi khi tải lên hình ảnh:", error);
        }
    };

    return isOpen ? (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{locationData ? "Chỉnh sửa vị trí" : "Thêm vị trí mới"}</h2>
                <input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />
                <button onClick={handleImageUpload}>Tải ảnh</button>
                <input
                    type="text"
                    name="tenPhong"
                    placeholder="Tên vị trí"
                    value={form.tenPhong}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="tinhThanh"
                    placeholder="Tỉnh thành"
                    value={form.tinhThanh}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="quocGia"
                    placeholder="Quốc gia"
                    value={form.quocGia}
                    onChange={handleInputChange}
                />
                <div className="modal-buttons">
                    <button onClick={onClose}>Hủy</button>
                    <button onClick={handleSubmit}>
                        {locationData ? "Cập nhật" : "Thêm mới"}
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ViTriForm;
