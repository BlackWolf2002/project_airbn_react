import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    // Kiểm tra nếu user chưa đăng nhập hoặc không phải admin
    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminRoute;
