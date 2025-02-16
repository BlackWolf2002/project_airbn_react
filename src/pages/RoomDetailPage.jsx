import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getRoomByID } from "../api/roomService";
import RoomDetail from "../components/RoomDetail"; // Import component RoomDetail

const RoomDetailPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const navigate = useNavigate(); // Hook điều hướng

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const data = await getRoomByID(id);
                console.log("📌 Dữ liệu phòng:", data);
                setRoom(data.content);
            } catch (error) {
                console.error("❌ Lỗi khi lấy phòng:", error);
            }
        };

        fetchRoom();
    }, [id]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Chi Tiết Phòng</h1>
            
            {/* Nút Quay lại */}
            <button 
                onClick={() => navigate(-1)} // Quay về trang trước
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mb-4"
            >
                ⬅ Quay lại
            </button>

            <RoomDetail room={room} /> {/* Sử dụng component RoomDetail */}
        </div>
    );
};

export default RoomDetailPage;
