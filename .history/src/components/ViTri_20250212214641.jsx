import React from "react";
import "../style/Admin.css";

export const ViTri = () => {
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
