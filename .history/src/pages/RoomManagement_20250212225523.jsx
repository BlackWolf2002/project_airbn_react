import { useState, useEffect } from "react";
import {
    fetchRooms,
    addRoom,
    updateRoom,
    deleteRoom,
} from "../api/roomService";
import RoomForm from "../components/RoomForm"; // Import RoomForm
import { fetchLocations } from "../api/locationService";
import AdminNavbar from "../components/AdminNavbar";
import "../style/Admin.css";
import "../style/RoomManagement.css";

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState(null); // Dữ liệu của form thêm/chỉnh sửa
    const [locations, setLocations] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    // Lấy dữ liệu phòng từ API
    const fetchRoomData = async (pageIndex = 1) => {
        try {
            const response = await fetchRooms(pageIndex, 10, "");
            const { data, totalRow } = response.content || {};
            setRooms(data || []);
            setTotalPages(Math.ceil(totalRow / 10));
        } catch (error) {
            console.error(
                "Lỗi khi lấy dữ liệu phòng:",
                error.response?.data || error.message
            );
        }
    };

    // Lấy danh sách vị trí từ API
    const fetchLocationData = async () => {
        try {
            const response = await fetchLocations();
            setLocations(response.content || []);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách vị trí:", error);
        }
    };

    // Ánh xạ mã vị trí sang tên vị trí
    const getLocationName = (maViTri) => {
        const location = locations.find((loc) => loc.id === maViTri);
        return location ? location.tenViTri : "Không xác định";
    };

    // Xử lý tìm kiếm phòng
    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchKeyword(keyword);

        if (keyword) {
            const filteredRooms = rooms.filter((room) =>
                room.tenPhong.toLowerCase().includes(keyword)
            );
            setRooms(filteredRooms);
        } else {
            fetchRoomData(currentPage);
        }
    };

    // Xử lý thêm/cập nhật phòng
    const handleFormSubmit = async (data) => {
        try {
            if (data.id) {
                await updateRoom(data.id, data);
            } else {
                await addRoom(data);
            }
            setIsFormVisible(false);
            fetchRoomData(currentPage);
        } catch (error) {
            console.error("Lỗi khi thêm/cập nhật phòng:", error);
        }
    };

    // Xử lý xóa phòng
    const handleDelete = async (id) => {
        try {
            await deleteRoom(id);
            setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa phòng:", error);
        }
    };

    // Gọi API khi chuyển trang hoặc khởi tạo
    useEffect(() => {
        fetchLocationData();
        fetchRoomData(currentPage);
    }, [currentPage]);

    return (
        <div className="admin-container">
            {/* Sidebar menu */}
            <AdminNavbar />
            <div className="admin-content">
                <h2 className="admin-title">Quản lý phòng</h2>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Nhập từ khóa tìm kiếm..."
                        value={searchKeyword}
                        onChange={handleSearch}
                    />
                </div>

                <button
                    className="add-room"
                    onClick={() => {
                        setFormData(null);
                        setIsFormVisible(true);
                    }}
                >
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
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
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
                                    <td>{getLocationName(room.maViTri)}</td>
                                    <td>{room.moTa?.slice(0, 50) || ""}...</td>
                                    <td>
                                        <button
                                            className="edit"
                                            onClick={() => {
                                                setFormData(room);
                                                setIsFormVisible(true);
                                            }}
                                        >
                                            Chỉnh sửa
                                        </button>

                                        <button
                                            className="delete"
                                            onClick={() =>
                                                handleDelete(room.id)
                                            }
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Không có dữ liệu.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Phân trang */}
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={
                                currentPage === index + 1 ? "active" : ""
                            }
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* Form thêm/chỉnh sửa phòng */}
                {isFormVisible && (
                    <RoomForm
                        initialData={formData}
                        onSubmit={(data) => handleFormSubmit(data)}
                        onClose={() => setIsFormVisible(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default RoomManagement;
