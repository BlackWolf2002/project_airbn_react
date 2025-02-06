import React, { useEffect, useState } from "react";
import { getUsers } from "../api/userService";

export const UserTable = ({ onEdit }) => {
    const [uses, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await getUsers();
        setUsers(data);
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
                    {users.filter(user => user.username.includes(search)).map(user =>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                <img src="{user.avatar}" alt="avatar" className="avatar" />
                                {user.username}
                            </td>
                            <td>{user.birthday}</td>
                            <td>{user.email}</td>
                            <td className={user.role === "ADMIN" ? "admin-role" : "user-role"}>{user.role}</td>
                            <td>
                            <button onClick={() => onEdit(user)}>✏️</button>
                            <button onClick={() => handleDelete(user.id)}>🗑️</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
