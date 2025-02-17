import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomByID } from "../api/roomService";
import { getBinhLuanTheoPhong } from "../api/apiBinhLuan"; // Import API lấy bình luận
import RoomDetail from "../components/RoomDetail";

const RoomDetailPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [comments, setComments] = useState([]); // State lưu danh sách bình luận
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomAndComments = async () => {
            try {
                const roomData = await getRoomByID(id);
                console.log("📌 Dữ liệu phòng:", roomData);
                setRoom(roomData.content);

                // Gọi API lấy bình luận sau khi có thông tin phòng
                const commentsData = await getBinhLuanTheoPhong(id);
                console.log("💬 Bình luận:", commentsData); // Log API response
                setComments(commentsData || []); // Lưu vào state
            } catch (error) {
                console.error("❌ Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchRoomAndComments();
    }, [id]); // Chạy lại khi id thay đổi

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Chi Tiết Phòng</h1>
            
            {/* Nút Quay lại */}
            <button 
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mb-4"
            >
                ⬅ Quay lại
            </button>

            <RoomDetail room={room} />

            {/* Hiển thị danh sách bình luận */}
            <div className="mt-6">
                <h2 className="text-xl font-bold">💬 Bình luận ({comments.length})</h2>
                {comments.length > 0 ? (
                    <ul className="mt-2">
                        {comments.map((comment, index) => (
                            <li key={index} className="border-b py-2">
                                <p><strong>{comment.tenNguoiBinhLuan}:</strong> {comment.noiDung}</p>
                                <span className="text-gray-500 text-sm">Ngày: {new Date(comment.ngayBinhLuan).toLocaleDateString()}</span>
                                <div className="flex items-center mt-2">
                                    <img src={comment.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                                    <span className="text-gray-500 text-sm">Sao: {comment.saoBinhLuan}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Chưa có bình luận nào.</p>
                )}
            </div>
        </div>
    );
};

export default RoomDetailPage;