import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userService.js";
import "../style/Admin.css";

const UserTable = ({ onEdit }) => {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]); // Lưu toàn bộ user để lọc
    const [search, setSearch] = useState("");
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        loadUsers(currentPage);
    }, [currentPage]);

    const loadUsers = async (page) => {
        const { data, totalRow } = await getUsers(page, pageSize);
        setUsers(data || []);
        setAllUsers(data || []); // Lưu toàn bộ dữ liệu để tìm kiếm frontend
        setTotalUsers(totalRow || 0);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);

        if (query.trim() === "") {
            setUsers(allUsers);
            return;
        }

        // Lọc trực tiếp trên frontend
        const filteredUsers = allUsers.filter((user) =>
            user.name.toLowerCase().includes(query)
        );

        console.log("🔍 Kết quả tìm kiếm (lọc frontend):", filteredUsers);
        setUsers(filteredUsers);
    };

    return (
        <div className="user-table">
            <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={search}
                onChange={handleSearch}
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
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.birthday}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => onEdit(user)}>
                                        ✏️
                                    </button>
                                    <button onClick={() => deleteUser(user.id)}>
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
