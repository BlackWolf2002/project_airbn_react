import React, { useEffect, useState } from "react";
import { getLocations } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Home.css";

const Home = () => {
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

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

    // Chuyển hướng khi bấm vào card
    const selectLocation = (locationId) => {
        navigate(`/rooms-by-location/${locationId}`);
    };

    return (
        <div className="home">
            <Navbar />
            <section className="locations">
                <h2>Khám phá những điểm đến gần đây</h2>
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
