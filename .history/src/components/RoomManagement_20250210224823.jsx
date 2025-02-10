import { useEffect, useState } from "react";
import {
    fetchRooms,
    addRoom,
    updateRoom,
    deleteRoom,
} from "../api/roomService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchRoomData = async (page) => {
        try {
            const response = await fetchRooms(page, 10);
            setRooms(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch rooms:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteRoom(id);
            fetchRoomData(currentPage);
        } catch (error) {
            console.error("Failed to delete room:", error);
        }
    };

    useEffect(() => {
        fetchRoomData(currentPage);
    }, [currentPage]);

    return (
        <div className="room-management">
            <h1>Quản lý phòng</h1>
            <button onClick={() => console.log("Add Room")}>
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
                                    style={{}}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
