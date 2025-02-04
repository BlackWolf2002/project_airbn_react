import React, { useEffect, useState } from "react";
import { getLocations, getRooms } from "../api/apiService";
import "../style/Home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
    const [locations, setLocations] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const locationData = await getLocations();
            const roomData = await getRooms();
            setLocations(locationData);
            setRooms(roomData);
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

            <section className="locations">
                <h2>Khám phá những điểm đến gần đây</h2>
                <div className="location-list">
                    {locations.map((location) => (
                        <div className="location-card" key={location.id}>
                            <img
                                src={location.hinhAnh}
                                alt={location.tenViTri}
                            />
                            <h3>{location.tenViTri}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rooms">
                <h2>Ở bất cứ đâu</h2>
                <div className="room-list">
                    {rooms.map((room) => (
                        <div className="room-card" key={room.id}>
                            <img src={room.hinhAnh} alt={room.tenPhong} />
                            <h3>{room.tenPhong}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
