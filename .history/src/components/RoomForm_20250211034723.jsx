import React, { useState, useEffect } from "react";
import "../style/RoomForm.css";
import { fetchLocations } from "../api/locationService"; // Import hàm fetch API vị trí

const RoomForm = ({ initialData = {}, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        tenPhong: "",
        moTa: "",
        giaTien: 0,
        khach: 0,
        phongNgu: 0,
        giuong: 0,
        phongTam: 0,
        mayGiat: false,
        banLa: false,
        tivi: false,
        dieuHoa: false,
        wifi: false,
        bep: false,
        doXe: false,
        hoBoi: false,
        maViTri: "",
        hinhAnh: "",
        ...initialData,
    });

    const [locations, setLocations] = useState([]); // Lưu danh sách vị trí

    // 🛠 Gọi API lấy danh sách vị trí khi component mount
    useEffect(() => {
        const loadLocations = async () => {
            try {
                const response = await fetchLocations();
                setLocations(response.content || []); // Lưu danh sách vị trí vào state
            } catch (error) {
                console.error("❌ Lỗi khi lấy danh sách vị trí:", error);
            }
        };
        loadLocations();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2>{formData.id ? "Chỉnh sửa phòng" : "Thêm phòng thuê"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Vị trí</label>
                    <select
                        name="maViTri"
                        value={formData.maViTri || ""}
                        onChange={handleChange}
                    >
                        <option value="">Chọn vị trí</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.tenViTri}
                            </option>
                        ))}
                    </select>

                    <div className="form-actions">
                        <button type="button" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit">
                            {formData.id ? "Cập nhật" : "Thêm mới"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomForm;
