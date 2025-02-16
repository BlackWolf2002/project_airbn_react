
const RoomDetail = ({ room }) => {
    if (!room) {
        return <div className="text-center text-lg mt-10">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Ảnh phòng */}
            <img src={room.hinhAnh} alt={room.tenPhong} className="w-full h-64 object-cover rounded-lg" />

            {/* Thông tin phòng */}
            <h1 className="text-3xl font-bold mt-4">{room.tenPhong}</h1>
            <p className="text-gray-600 mt-2">{room.moTa}</p>

            {/* Chi tiết phòng */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div><strong>Khách:</strong> {room.khach} người</div>
                <div><strong>Phòng ngủ:</strong> {room.phongNgu}</div>
                <div><strong>Giường:</strong> {room.giuong}</div>
                <div><strong>Phòng tắm:</strong> {room.phongTam}</div>
                <div><strong>Giá tiền:</strong> <span className="text-red-500 font-bold">{room.giaTien} VND</span></div>
            </div>

            {/* Tiện nghi */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Tiện nghi</h2>
                <ul className="grid grid-cols-2 gap-2 mt-2">
                    <li>Máy giặt: {room.mayGiat ? "✅" : "❌"}</li>
                    <li>Bàn là: {room.banLa ? "✅" : "❌"}</li>
                    <li>Tivi: {room.tivi ? "✅" : "❌"}</li>
                    <li>Điều hòa: {room.dieuHoa ? "✅" : "❌"}</li>
                    <li>Wifi: {room.wifi ? "✅" : "❌"}</li>
                    <li>Bếp: {room.bep ? "✅" : "❌"}</li>
                    <li>Đỗ xe: {room.doXe ? "✅" : "❌"}</li>
                    <li>Hồ bơi: {room.hoBoi ? "✅" : "❌"}</li>
                    <li>Bàn ủi: {room.banUi ? "✅" : "❌"}</li>
                </ul>
            </div>

            {/* Nút đặt phòng */}
            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Đặt ngay
            </button>
        </div>
    );
};

export default RoomDetail;
