import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
    const { user, loginUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            loginUser(JSON.parse(storedUser)); // Cập nhật user vào context
        }
        setIsLoading(false);
    }, [loginUser]);

    if (isLoading) return <div>Loading...</div>;

    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminRoute;
