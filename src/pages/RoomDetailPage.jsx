import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomByID } from "../api/roomService";
import { getBinhLuanTheoPhong } from "../api/apiBinhLuan"; // Import API lấy bình luận
import RoomDetail from "../components/RoomDetail";
import { FaStar } from "react-icons/fa"; // Import icon ngôi sao

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
                console.log("💬 Bình luận:", commentsData);
                setComments(commentsData || []);
            } catch (error) {
                console.error("❌ Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchRoomAndComments();
    }, [id]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Chi Tiết Phòng</h1>
            
            {/* Nút Quay lại */}
            <button 
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mb-6"
            >
                ⬅ Quay lại
            </button>

            <RoomDetail room={room} />

            {/* Hiển thị danh sách bình luận */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 Bình luận ({comments.length})</h2>
                {comments.length > 0 ? (
                    <div className="space-y-4">
                        {comments.map((comment, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                                <div className="flex items-center mb-2">
                                    <img src={comment.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-3 border border-gray-300" />
                                    <div>
                                        <p className="font-semibold text-gray-900">{comment.tenNguoiBinhLuan}</p>
                                        <span className="text-gray-500 text-sm">Ngày: {new Date(comment.ngayBinhLuan).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-2">{comment.noiDung}</p>
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-500 text-lg mr-1" /> <span className="text-gray-700">{comment.saoBinhLuan}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">Chưa có bình luận nào.</p>
                )}
            </div>
        </div>
    );
};

export default RoomDetailPage;
