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

    return <div>Home</div>;
};
