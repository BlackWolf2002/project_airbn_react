import React, { useEffect, useState, useRef } from "react";
import { getLocations, getRooms } from "../api/apiService";
import "../style/Home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
    const [locations, setLocations] = useState([]);
    const [rooms, setRooms] = useState([]);

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

    

    return (
        <div className="home">
            <Navbar/>
            {/* Khám phá những điểm đến gần đây */}
            <section className="locations">
                <h2>Khám phá những điểm đến gần đây</h2>
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