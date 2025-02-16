import { useNavigate } from "react-router-dom";


const RoomCard = ({ room }) => {
    const navigate = useNavigate();

    return (
        <div>
         
            <div className="p-4 bg-white shadow-md rounded-lg flex flex-col h-full">
            {/* Tiêu đề có chiều cao cố định để đồng bộ */}
            <h3 className="text-lg font-bold h-12">{room.tenPhong}</h3>

            {/* Khoảng cách giữa tiêu đề và ảnh */}
            <div className="mt-10">
                <img src={room.hinhAnh} alt={room.tenPhong} className="w-full h-40 object-cover rounded-lg" />
            </div>

            {/* Mô tả phòng */}
            <p className="text-gray-700 mt-2 flex-1">{room.moTa.slice(0, 100)}...</p>

            {/* Giá tiền và nút Xem chi tiết */}
            <div className="flex justify-between items-center mt-4">
                <p className="text-red-500 font-bold">{room.giaTien} VND</p>
                <button
                    onClick={() => navigate(`/room/${room.id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Xem chi tiết
                </button>
            </div>
            </div>
            
        </div>
    );
};

export default RoomCard;
