import React, { useState } from "react";
import "../style/RoomForm.css";
import { fetchLocations } from "../api/locationService";
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
                    <label>Thêm hình phòng</label>
                    <input
                        type="file"
                        name="hinhAnh"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setFormData((prev) => ({
                                ...prev,
                                hinhAnh: file ? URL.createObjectURL(file) : "",
                            }));
                        }}
                    />
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
                    <label>Vị trí</label>
                    <select
                        name="maViTri"
                        value={getLocationName(formData.maViTri) || ""}
                        onChange={handleChange}
                    >
                        <option value="">Chọn vị trí</option>
                        {/* Thay options dưới bằng danh sách vị trí */}
                        <option value="1">Quận 1</option>
                        <option value="2">Cái Răng</option>
                        <option value="3">Hòn Rùa</option>
                    </select>
                    <label>Số khách</label>
                    <input
                        type="number"
                        name="khach"
                        value={formData.khach || ""}
                        onChange={handleChange}
                        placeholder="Nhập số khách"
                    />
                    <label>Số phòng ngủ</label>
                    <input
                        type="number"
                        name="phongNgu"
                        value={formData.phongNgu || ""}
                        onChange={handleChange}
                        placeholder="Nhập số phòng ngủ"
                    />
                    <label>Số giường</label>
                    <input
                        type="number"
                        name="giuong"
                        value={formData.giuong || ""}
                        onChange={handleChange}
                        placeholder="Nhập số giường"
                    />
                    <label>Số phòng tắm</label>
                    <input
                        type="number"
                        name="phongTam"
                        value={formData.phongTam || ""}
                        onChange={handleChange}
                        placeholder="Nhập số phòng tắm"
                    />
                    <label>Tiện ích</label>
                    <div className="checkbox-group">
                        <label>
                            Máy giặt
                            <input
                                type="checkbox"
                                name="mayGiat"
                                checked={formData.mayGiat || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Bàn là
                            <input
                                type="checkbox"
                                name="banLa"
                                checked={formData.banLa || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Tivi
                            <input
                                type="checkbox"
                                name="tivi"
                                checked={formData.tivi || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Điều hòa
                            <input
                                type="checkbox"
                                name="dieuHoa"
                                checked={formData.dieuHoa || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Wifi
                            <input
                                type="checkbox"
                                name="wifi"
                                checked={formData.wifi || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Bếp
                            <input
                                type="checkbox"
                                name="bep"
                                checked={formData.bep || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Đỗ xe
                            <input
                                type="checkbox"
                                name="doXe"
                                checked={formData.doXe || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Hồ bơi
                            <input
                                type="checkbox"
                                name="hoBoi"
                                checked={formData.hoBoi || false}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
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
