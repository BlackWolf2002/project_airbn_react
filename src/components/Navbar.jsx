import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchLocations } from "../api/apiService";
import "../style/Home.css";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearch(query);

        if (query.length > 2) {
            const results = await searchLocations(query);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    const selectLocation = (location) => {
        navigate(`/rooms?location=${location.id}`);
    };

    return (
        <nav className="navbar">
            <div className="logo">Airbnb Clone</div>

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

            <div className="nav-links">
                <Link to="/login">Đăng Nhập</Link>
                <Link to="/login">Đăng Ký</Link>
            </div>
        </nav>
    );
};

export default Navbar;
