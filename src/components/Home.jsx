import React, { useEffect, useState, useRef } from "react";
import { getLocations, getRooms, searchLocations } from "../api/apiService";
import "../style/Home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
    const [locations, setLocations] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const videoRefs = useRef([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationData = await getLocations();
                const roomData = await getRooms();
                setLocations(locationData);
                setRooms(roomData);
            } catch (error) {
                console.error("❌ Lỗi khi tải dữ liệu trang chủ:", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearch(query);
        if (query.length > 0) {
            const results = await searchLocations(query);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearchFocus = () => {
        setIsSearchActive(true);
        videoRefs.current.forEach((videoElement) => {
            videoElement.pause();
        });
    };

    const handleSearchBlur = () => {
        setIsSearchActive(false);
        videoRefs.current.forEach((videoElement) => {
            videoElement.play();
        });
    };

    const selectLocation = (location) => {
        navigate(`/rooms?location=${location.id}`);
    };

    return (
        <div className="home">
            <Navbar />
            
            {/* Khám phá những điểm đến gần đây */}
            <section className="locations">
                <h2>Khám phá những điểm đến gần đây</h2>
                <div className="search-container my-2">
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
                    {locations.map((location, index) => (
                        <div className="location-card" key={index}>
                            <img
                                src={location.hinhAnh}
                                alt={location.tenViTri}
                            />
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