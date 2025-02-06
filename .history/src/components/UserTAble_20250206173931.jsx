import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userService";
import "../style/Admin.css";

const UserTable = ({ onEdit }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await getUsers();
        setUsers(data || []); // Nếu dữ liệu bị `undefined`, đặt thành `[]`
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            await deleteUser(id);
            loadUsers();
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
                    {users && users.length > 0 ? (
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
        </div>
    );
};

export default UserTable;
