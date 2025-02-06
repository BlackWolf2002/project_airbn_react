import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userService.js";
import "../style/Admin.css";

const UserTable = ({ onEdit }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Số lượng user mỗi trang

    useEffect(() => {
        console.log("📢 Gọi API lấy danh sách user...");
        loadUsers(currentPage);
    }, [currentPage]);

    const loadUsers = async (page) => {
        const { data, totalRow } = await getUsers(page, pageSize);

        console.log("📢 Dữ liệu users từ API:", data); // Debug dữ liệu API trả về
        setUsers(data || []); // Đảm bảo state luôn được cập nhật
        setTotalUsers(totalRow || 0);
    };

    console.log("📢 State users:", users); // Kiểm tra state có cập nhật không

    const totalPages = Math.ceil(totalUsers / pageSize);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            await deleteUser(id);
            loadUsers(currentPage);
        }
    };

    return (
        <div className="user-table">
            <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Birthday</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users
                            .filter((user) =>
                                user.username
                                    ?.toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        <img
                                            src={
                                                user.avatar ||
                                                "default-avatar.png"
                                            }
                                            alt="avatar"
                                            className="avatar"
                                        />
                                        {user.username}
                                    </td>
                                    <td>
                                        {user.birthday || "Không có dữ liệu"}
                                    </td>
                                    <td>{user.email}</td>
                                    <td
                                        className={
                                            user.role === "ADMIN"
                                                ? "admin-role"
                                                : "user-role"
                                        }
                                    >
                                        {user.role}
                                    </td>
                                    <td>
                                        <button onClick={() => onEdit(user)}>
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                                Không có dữ liệu người dùng
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    ◀ Trang trước
                </button>
                <span style={{ margin: "0 15px" }}>
                    Trang {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    Trang sau ▶
                </button>
            </div>
        </div>
    );
};

export default UserTable;
