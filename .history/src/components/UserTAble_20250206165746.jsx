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

    return <div>UserTAble</div>;
};
