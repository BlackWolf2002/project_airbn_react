import React, { useEffect, useState } from "react";
import { getLocations } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Home.css";

const Home = () => {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationData = await getLocations();
                setLocations(locationData);
            } catch (error) {
                console.error("❌ Lỗi khi tải dữ liệu trang chủ:", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearch(query);
        if (query.length > 2) {
            const results = await searchLocations(query);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    // Chuyển hướng khi bấm vào card
    const selectLocation = (locationId) => {
        navigate(`/rooms-by-location/${locationId}`);
    };

    return (
        <div className="home">
            <Navbar />
            <section className="locations">
                <h2>Khám phá những điểm đến gần đây</h2>
                <div className="search-container">
                        <input
                            type="text"
                            placeholder="Bạn sắp đi đâu?"
                            value={search}
                            onChange={handleSearch}
                            className="placeholder-red-400"
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
                <div className="location-grid">
                    {locations.map((location) => (
                        <div
                            className="location-card"
                            key={location.id}
                            onClick={() => selectLocation(location.id)}
                        >
                            <img src={location.hinhAnh} alt={location.tenViTri} />
                            <h3>{location.tenViTri}</h3>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
