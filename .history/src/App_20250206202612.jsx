import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./routes/AdminRoute";
import UserTable from "./components/UserTable"; // Import bảng user

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Login />} />

                    {/* Nếu vào /admin, tự động chuyển hướng đến /admin/users */}
                    <Route
                        path="/admin"
                        element={<Navigate to="/admin/users" />}
                    />

                    {/* Route cho trang Admin */}
                    <Route
                        path="/admin/users"
                        element={
                            <AdminRoute>
                                <AdminPage />
                            </AdminRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
