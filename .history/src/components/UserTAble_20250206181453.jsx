import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, searchUsers } from "../api/userService.js";
import "../style/Admin.css";

const UserTable = ({ onEdit }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Số lượng user mỗi trang

    useEffect(() => {
        loadUsers(currentPage);
    }, [currentPage]);

    const loadUsers = async (page) => {
        const { data, totalRow } = await getUsers(page, pageSize);
        setUsers(data || []);
        setTotalUsers(totalRow || 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            console.log(`📢 Đang xóa user với ID: ${id}`); // Debug ID user

            try {
                const isDeleted = await deleteUser(id);
                console.log("📢 Kết quả xóa user:", isDeleted);

                if (isDeleted) {
                    alert("Xóa người dùng thành công!");
                    loadUsers(currentPage);
                } else {
                    alert("Lỗi: Không thể xóa người dùng.");
                }
            } catch (error) {
                console.error("❌ Lỗi khi xóa user:", error);
                alert("Có lỗi xảy ra khi xóa người dùng.");
            }
        }
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearch(query);

        if (query.trim() === "") {
            loadUsers(1); // Nếu input rỗng thì gọi lại danh sách đầy đủ
        } else {
            const filteredUsers = await searchUsers(query);
            setUsers(filteredUsers || []);
        }
    };

    const totalPages = Math.ceil(totalUsers / pageSize);

    return (
        <div className="user-table">
            {/* 🔍 Ô tìm kiếm */}
            <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={search}
                onChange={handleSearch}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />

            {/* 🏷️ Bảng hiển thị user */}
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
                    {users && users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <img
                                            src={
                                                user.avatar ||
                                                "default-avatar.png"
                                            }
                                            alt="avatar"
                                            className="avatar"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <span>
                                            {user.name || "Không có tên"}
                                        </span>
                                    </div>
                                </td>
                                <td>{user.birthday || "Không có dữ liệu"}</td>
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
                                        onClick={() => handleDelete(user.id)}
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

            {/* 📌 Pagination */}
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
