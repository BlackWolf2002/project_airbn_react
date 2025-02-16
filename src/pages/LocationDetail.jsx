import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomsByLocationName } from "../api/apiService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomListByLocation from "../components/RoomListByLocation";
import "../style/LocationDetail.css";

const LocationDetail = () => {
    const { tenViTri } = useParams();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const data = await getRoomsByLocationName(tenViTri);
                setLocation(data);
            } catch (error) {
                console.error("❌ Lỗi khi tải thông tin địa điểm:", error);
            }
        };

        fetchLocation();
    }, [tenViTri]);

    if (!location) {
        return <div>Loading...</div>;
    }

    return (
        <div className="location-detail">
            <Navbar />
            <div className="location-detail-content">
                <h2>{location.tenViTri}</h2>
                <img src={location.hinhAnh} alt={location.tenViTri} />
                <p>{location.moTa}</p>
                <p>Tỉnh thành: {location.tinhThanh}</p>
                <p>Quốc gia: {location.quocGia}</p>
            </div>
            <RoomListByLocation tenViTri={location.tenViTri} />
            <Footer />
        </div>
    );
};

export default LocationDetail;