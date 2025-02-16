import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user?.role === "ADMIN" ? children : <Navigate to="/admin" />;
};

export default AdminRoute;
