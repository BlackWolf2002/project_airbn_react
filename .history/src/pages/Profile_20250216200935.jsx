import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserDetails, getUserBookings } from "../api/userService";

const Profile = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            fetchUserDetails();
            fetchUserBookings();
        }
    }, [user, navigate]);

    const fetchUserDetails = async () => {
        try {
            const data = await getUserDetails(user.id);
            setUserData(data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin user:", error);
        }
    };

    const fetchUserBookings = async () => {
        try {
            const data = await getUserBookings(user.id);
            setBookings(data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin đặt phòng:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-center">
                Thông tin cá nhân
            </h2>
            {userData ? (
                <div className="mt-4">
                    <p>
                        <strong>Tên:</strong> {userData.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {userData.email}
                    </p>
                    <p>
                        <strong>Số điện thoại:</strong> {userData.phone}
                    </p>
                    <p>
                        <strong>Vai trò:</strong> {userData.role}
                    </p>
                    <button
                        onClick={logoutUser}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Đăng xuất
                    </button>
                </div>
            ) : (
                <p>Đang tải thông tin...</p>
            )}

            <h2 className="text-2xl font-bold text-center mt-6">
                Phòng đã thuê
            </h2>
            {bookings.length > 0 ? (
                <ul className="mt-4">
                    {bookings.map((booking) => (
                        <li
                            key={booking.id}
                            className="border p-4 rounded mb-2"
                        >
                            <p>
                                <strong>{booking.roomName}</strong>
                            </p>
                            <p>Giá: {booking.price}$/tháng</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có phòng nào đã thuê.</p>
            )}
        </div>
    );
};

export default Profile;
