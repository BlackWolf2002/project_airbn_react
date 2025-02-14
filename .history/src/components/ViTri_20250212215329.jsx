import React, { useState, useEffect } from "react";
import { fetchLocations, deleteLocation } from "../api/locationService.js";
import ViTriForm from "./ViTriForm.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";

const ViTri = () => {
    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Hiển thị 3 mục mỗi trang
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const getLocations = async () => {
            try {
                const data = await fetchLocations();
                setLocations(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách vị trí:", error);
            }
        };
        getLocations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteLocation(id);
            setLocations(locations.filter((location) => location.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa vị trí:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredLocations = locations.filter((location) =>
        location.tenPhong.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
    const displayedLocations = filteredLocations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="admin-content">
            <h2 className="admin-title">Quản lý vị trí</h2>
            <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button
                onClick={() => {
                    setIsFormOpen(true);
                    setSelectedLocation(null);
                }}
                className="add-user-button"
            >
                + Thêm vị trí mới
            </button>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Mã ID</th>
                        <th>Image</th>
                        <th>Tỉnh thành</th>
                        <th>Quốc gia</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedLocations.map((location) => (
                        <tr key={location.id}>
                            <td>{location.id}</td>
                            <td>
                                <img
                                    src={location.hinhAnh}
                                    alt={location.tenPhong}
                                    className="avatar"
                                />
                                {location.tenPhong}
                            </td>
                            <td>{location.tinhThanh}</td>
                            <td>{location.quocGia}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setSelectedLocation(location);
                                        setIsFormOpen(true);
                                    }}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(location.id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {isFormOpen && (
                <ViTriForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    locationData={selectedLocation}
                    setLocations={setLocations}
                />
            )}
        </div>
    );
};

export default ViTri;
