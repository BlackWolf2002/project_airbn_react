import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Home.css";
import { getLocations } from "../api/apiService";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    // Gọi API tìm kiếm địa điểm
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearch(query);

        if (query.length > 2) {
            const results = await getLocations(query);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    // Chọn địa điểm -> Chuyển sang trang danh sách phòng
    const selectLocation = (location) => {
        navigate(`/rooms?location=${location.id}`);
    };

    return (
        <nav className="navbar">
            <div className="logo">Airbnb Clone</div>

            {/* Thanh tìm kiếm */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Bạn sắp đi đâu?"
                    value={search}
                    onChange={handleSearch}
                />
                <button className="search-btn">🔍</button>
                {suggestions.length > 0 && (
                    <ul className="suggestion-list">
                        {suggestions.map((loc) => (
                            <li
                                key={loc.id}
                                onClick={() => selectLocation(loc)}
                            >
                                {loc.tenViTri}, {loc.tinhThanh}, {loc.quocGia}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Links Đăng nhập / Đăng ký */}
            <div className="nav-links">
                <Link to="/login">Đăng Nhập</Link>
                <Link to="/register">Đăng Ký</Link>
            </div>
        </nav>
    );
};

export default Navbar;
