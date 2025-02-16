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
import RoomManagement from "./pages/RoomManagement";
import ViTri from "./pages/ViTri";
import BookingManagement from "./pages/BookingManagement";
import RoomsByLocation from "./pages/RoomsByLocation.jsx";
import RoomDetailPage from "./pages/RoomDetailPage"; // Import trang chi tiết phòng

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

                    {/* Route cho quản lý Vị Trí*/}
                    <Route
                        path="/admin/locations"
                        element={
                            <AdminRoute>
                                <ViTri />
                            </AdminRoute>
                        }
                    />

                    {/* Route cho quản lý Booking*/}
                    <Route
                        path="/admin/bookings"
                        element={
                            <AdminRoute>
                                <BookingManagement />
                            </AdminRoute>
                        }
                    />

                    {/* Route hiển thị danh sách phòng theo vị trí */}
                    <Route path="/rooms-by-location/:id" element={<RoomsByLocation />} />

                    {/* Route chi tiết phòng */}
                    <Route path="/room/:id" element={<RoomDetailPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
