import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./components/Home";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./routes/AdminRoute";

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

                    {/* Route cho quản lý Room */}
                    <Route
                        path="/admin/rooms"
                        element={
                            <AdminRoute>
                                <RoomManagement />
                            </AdminRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
