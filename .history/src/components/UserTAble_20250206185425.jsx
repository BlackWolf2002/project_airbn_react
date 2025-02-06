import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userService.js";
import UserForm from "./UserForm";
import "../style/Admin.css";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pageSize = 10;

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
            await deleteUser(id);
            loadUsers(currentPage);
        }
    };

    const handleOpenModal = (user = null) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="user-table">
            <button className="add-user-btn" onClick={() => handleOpenModal()}>
                + Thêm người dùng
            </button>
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
                                    <div className="user-info">
                                        <img
                                            src={
                                                user.avatar ||
                                                "default-avatar.png"
                                            }
                                            alt="avatar"
                                            className="avatar"
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
                                    <button
                                        onClick={() => handleOpenModal(user)}
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
            <div className="pagination">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    ◀ Trang trước
                </button>
                <span>
                    Trang {currentPage} / {Math.ceil(totalUsers / pageSize)}
                </span>
                <button
                    onClick={() =>
                        setCurrentPage((prev) =>
                            Math.min(prev + 1, Math.ceil(totalUsers / pageSize))
                        )
                    }
                    disabled={currentPage >= Math.ceil(totalUsers / pageSize)}
                >
                    Trang sau ▶
                </button>
            </div>

            {/* Form Modal */}
            {isModalOpen && (
                <UserForm user={selectedUser} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default UserTable;
