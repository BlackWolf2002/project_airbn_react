import React, { useEffect, useState } from "react";
import { getLocations } from "../api/apiService";
import "../style/Home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const locationData = await getLocations();
            setLocations(locationData);
        };
        fetchData();
    }, []);

    return (
        <div className="home">
            <Navbar />

            <div className="banner">
                <div className="banner-overlay">
                    <h1>Nhờ có Host, mọi điều đều có thể</h1>
                </div>
            </div>

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
                            <div className="location-info">
                                <h3>{location.tenViTri}</h3>
                                <p>{location.moTa}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
