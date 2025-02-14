import React from "react";
import "../style/Admin.css";

export const ViTri = () => {
    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Hiển thị 3 mục mỗi trang
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    return (
        <div className="admin-content">
            <h2 className="admin-title">Quản lý vị trí</h2>
            <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchTerm}
            />
        </div>
    );
};
