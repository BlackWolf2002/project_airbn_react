import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
