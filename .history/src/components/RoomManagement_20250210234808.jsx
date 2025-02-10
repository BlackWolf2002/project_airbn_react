import React, { useState, useEffect } from "react";
import {
    fetchRooms,
    addRoom,
    updateRoom,
    deleteRoom,
} from "../api/roomService";
import RoomForm from "./RoomForm"; // Import RoomForm
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState(null); // Dữ liệu của form thêm/chỉnh sửa

    // Lấy dữ liệu phòng từ API
    const fetchRoomData = async (pageIndex = 1) => {
        try {
            const response = await fetchRooms(pageIndex, 10, "");
            console.log("Dữ liệu trả về từ API:", response);

            // Lấy dữ liệu từ `content`
            const { data, totalRow } = response.content || {};
            console.log("Dữ liệu data:", data);

            // Gán `data` vào state `rooms`
            setRooms(data || []);
            console.log("State rooms sau khi setRooms:", data);

            // Tính tổng số trang
            setTotalPages(Math.ceil(totalRow / 10));
        } catch (error) {
            console.error(
                "Lỗi khi lấy dữ liệu phòng:",
                error.response?.data || error.message
            );
        }
    };

    const [searchKeyword, setSearchKeyword] = useState("");

    // Hàm xử lý tìm kiếm
    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchKeyword(keyword);

        // Lọc danh sách phòng theo từ khóa tìm kiếm
        if (keyword) {
            const filteredRooms = rooms.filter((room) =>
                room.tenPhong.toLowerCase().includes(keyword)
            );
            setRooms(filteredRooms);
        } else {
            // Nếu không có từ khóa, gọi lại API để lấy danh sách đầy đủ
            fetchRoomData(currentPage);
        }
    };

    // Xử lý thêm hoặc cập nhật phòng
    const handleFormSubmit = async (data) => {
        try {
            if (data.id) {
                // Cập nhật phòng
                await updateRoom(data.id, data);
                console.log("Cập nhật thành công!");
            } else {
                // Thêm phòng mới
                await addRoom(data);
                console.log("Thêm phòng mới thành công!");
            }
            setIsFormVisible(false);
            fetchRoomData(currentPage); // Làm mới danh sách phòng
        } catch (error) {
            console.error("Lỗi khi thêm/cập nhật phòng:", error);
        }
    };

    // Xử lý xóa phòng
    const handleDelete = async (id) => {
        try {
            await deleteRoom(id);
            fetchRoomData(currentPage); // Làm mới danh sách phòng
        } catch (error) {
            console.error("Lỗi khi xóa phòng:", error);
        }
    };

    // Gọi API khi chuyển trang
    useEffect(() => {
        fetchRoomData(currentPage || 1); // Đảm bảo `currentPage` có giá trị mặc định
    }, [currentPage]);

    return (
        <div className="room-management">
            <h1>Quản lý phòng</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm..."
                    value={searchKeyword}
                    onChange={handleSearch}
                />
            </div>

            <button
                onClick={() => {
                    setFormData(null); // Xóa dữ liệu cũ để thêm mới
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
                    {rooms && rooms.length > 0 ? (
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
                                <td>{`Mã vị trí: ${room.maViTri || ""}`}</td>
                                <td>{room.moTa?.slice(0, 50) || ""}...</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            console.log("Chỉnh sửa", room.id)
                                        }
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        onClick={() =>
                                            console.log("Xóa", room.id)
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
                        className={currentPage === index + 1 ? "active" : ""}
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
    );
};

export default RoomManagement;
