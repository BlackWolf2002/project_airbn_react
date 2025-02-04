import React, { useEffect, useState } from "react";
import { getLocations, getRooms } from "../api/apiService";

export const Home = () => {
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

            {/* Banner */}
            <div className="banner">
                <h1>Nhờ có Host,mọi điều đều có thể</h1>
            </div>

            {/* Danh sách địa điểm */}
            <section className="locations">
                <h2>Khám phá những điểm đến gần đây</h2>
                <div className="location-list">
                    {locations.map((location) => div)}
                </div>
            </section>
        </div>
    );
};
