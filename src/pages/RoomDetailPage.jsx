import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomByID } from "../api/roomService";
import { getBinhLuanTheoPhong, dangBinhLuan } from "../api/apiBinhLuan";
import RoomDetail from "../components/RoomDetail";
import { FaStar } from "react-icons/fa";

const RoomDetailPage = () => {
    const { id } = useParams();
    const roomId = Number(id) || 0; // Chuyển ID về số, tránh lỗi undefined hoặc NaN

    const [room, setRoom] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(5); // Mặc định 5 sao
    const [loading, setLoading] = useState(false); // Loading khi gửi bình luận
    const navigate = useNavigate();

    // 🛠 Lấy thông tin phòng & bình luận khi vào trang
    useEffect(() => {
        const fetchRoomAndComments = async () => {
            try {
                console.log("🔥 Lấy thông tin phòng:", roomId);
                const roomData = await getRoomByID(roomId);
                setRoom(roomData.content);

                console.log("🔥 Lấy bình luận phòng:", roomId);
                const commentsData = await getBinhLuanTheoPhong(roomId);
                setComments(commentsData || []);
            } catch (error) {
                console.error("❌ Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchRoomAndComments();
    }, [roomId]);

    // 📌 Xử lý gửi bình luận
    const handleCommentSubmit = async () => {
        if (newComment.trim() === "") return alert("Vui lòng nhập nội dung bình luận!");

        setLoading(true); // Bắt đầu loading
        try {
            console.log("🛠 Gửi bình luận:", { roomId, newComment, rating });
            const response = await dangBinhLuan(roomId, newComment, rating);
            
            if (response) {
                console.log("✅ Bình luận đã được gửi:", response);

                // Lấy lại danh sách bình luận mới nhất sau khi gửi
                const updatedComments = await getBinhLuanTheoPhong(roomId);
                setComments(updatedComments || []);

                // Xóa nội dung nhập bình luận và reset rating
                setNewComment("");
                setRating(5);
            } else {
                alert("Lỗi khi gửi bình luận, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("❌ Gửi bình luận thất bại:", error);
            alert("Có lỗi xảy ra khi gửi bình luận!");
        } finally {
            setLoading(false); // Dừng loading
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Chi Tiết Phòng</h1>
            
            <button 
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mb-6"
            >
                ⬅ Quay lại
            </button>

            <RoomDetail room={room} />

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 Bình luận ({comments.length})</h2>
                
                {/* Nhập bình luận */}
                <div className="mb-6">
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder="Nhập bình luận của bạn..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>

                    {/* Chọn số sao */}
                    <div className="flex items-center mt-3">
                        <span className="mr-3 text-gray-700">Đánh giá:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`cursor-pointer text-lg ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleCommentSubmit}
                        className={`mt-2 px-4 py-2 rounded-lg text-white ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Đang gửi..." : "Gửi bình luận"}
                    </button>
                </div>

                {/* Hiển thị danh sách bình luận */}
                <div className="max-h-96 overflow-y-auto border rounded-lg p-4 bg-white shadow-md">
                    {comments.length > 0 ? (
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200">
                                    <div className="flex items-center mb-2">
                                        <img src={comment.avatar || "https://via.placeholder.com/40"} 
                                             alt="Avatar" 
                                             className="w-10 h-10 rounded-full mr-3 border border-gray-300" 
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900">{comment.tenNguoiBinhLuan || "Người dùng"}</p>
                                            <span className="text-gray-500 text-sm">Ngày: {new Date(comment.ngayBinhLuan).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-2">{comment.noiDung}</p>
                                    <div className="flex items-center">
                                        {[...Array(comment.saoBinhLuan || 5)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-500 text-lg mr-1" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Chưa có bình luận nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomDetailPage;
