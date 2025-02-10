const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Lấy dữ liệu phòng từ API
    const fetchRoomData = async (page) => {
        try {
            const response = await fetchRooms(page, 10);
            const { content, totalPages } = response.data;
            setRooms(content);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu phòng:", error);
        }
    };

    // Xử lý xóa phòng
    const handleDelete = async (id) => {
        try {
            await deleteRoom(id);
            fetchRoomData(currentPage); // Cập nhật danh sách phòng sau khi xóa
        } catch (error) {
            console.error("Lỗi khi xóa phòng:", error);
        }
    };

    // Gọi API khi chuyển trang
    useEffect(() => {
        fetchRoomData(currentPage);
    }, [currentPage]);

    return (
        <div className="room-management">
            <h1>Quản lý phòng</h1>
            <button onClick={() => console.log("Thêm phòng mới")}>
                + Thêm phòng mới
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Mã ID</th>
                        <th>Tên Phòng</th>
                        <th>Tỉnh Thành</th>
                        <th>Thông Tin</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>
                                <img
                                    src={room.hinhAnh}
                                    alt={room.tenPhong}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        marginRight: "10px",
                                        borderRadius: "5px",
                                    }}
                                />
                                {room.tenPhong}
                            </td>
                            <td>{`Mã vị trí: ${room.maViTri}`}</td>
                            <td title={room.moTa}>
                                {room.moTa.slice(0, 50)}...
                            </td>
                            <td>
                                <button
                                    onClick={() =>
                                        console.log("Chỉnh sửa phòng", room.id)
                                    }
                                >
                                    <AiFillEdit />
                                </button>
                                <button onClick={() => handleDelete(room.id)}>
                                    <AiFillDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Phân trang */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RoomManagement;
