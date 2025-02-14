import React, { useEffect, useState } from "react";
import {
    getUsers,
    searchUsers,
    deleteUser,
    updateUser,
} from "../api/userService.js";
import moment from "moment"; // Import moment để xử lý ngày tháng
import "../style/Admin.css";

const UserTable = ({ onEdit }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        if (search.trim() === "") {
            loadUsers(currentPage);
        } else {
            handleSearch(search);
        }
    }, [currentPage, search]);

    const loadUsers = async (page) => {
        const { data, totalRow } = await getUsers(page, pageSize);
        setUsers(data || []);
        setTotalUsers(totalRow || 0);
    };

    const handleUpdateUser = async (id, updatedData) => {
        const success = await updateUser(id, updatedData);

        if (success) {
            alert("✅ Cập nhật thành công!");
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, ...updatedData } : user
                )
            );
            loadUsers(currentPage);
        } else {
            alert("❌ Cập nhật thất bại!");
        }
    };

    const handleSearch = async (query) => {
        if (query.trim() === "") {
            loadUsers(currentPage);
            return;
        }

        try {
            const result = await searchUsers(query);
            if (result.length > 0) {
                setUsers(result);
            } else {
                const allUsers = await getUsers(1, 1000);
                const filteredUsers = allUsers.data.filter((user) =>
                    user.name.toLowerCase().includes(query.toLowerCase())
                );
                setUsers(filteredUsers);
            }
        } catch (error) {
            console.error("❌ Lỗi khi tìm kiếm user:", error);
        }
    };

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
                                <td>
                                    {/* Dùng moment.js để định dạng ngày tháng */}
                                    {user.birthday
                                        ? moment(user.birthday).format(
                                              "DD/MM/YYYY"
                                          )
                                        : "Không có dữ liệu"}
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
                                    <button
                                        onClick={() =>
                                            onEdit(user, handleUpdateUser)
                                        }
                                    >
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
