import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../api/userService";
import { getUserBookings } from "../api/bookingService";

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
            const data = await getUserById(user.id);
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
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex flex-col items-center md:w-1/3">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Avatar"
                        className="w-24 h-24 rounded-full"
                    />
                    <button className="mt-2 text-blue-500 hover:underline">
                        Cập nhật ảnh
                    </button>
                    <p className="mt-2 text-green-600 font-semibold">
                        ✅ Xác minh danh tính
                    </p>
                    <p className="text-gray-500">
                        Xác minh danh tính của bạn với huy hiệu xác minh danh
                        tính.
                    </p>
                    <button className="mt-2 px-4 py-2 bg-gray-300 text-black rounded">
                        Nhận huy hiệu
                    </button>
                    <p className="mt-2 font-semibold">
                        {userData?.name} ĐÃ XÁC NHẬN
                    </p>
                    <p className="text-gray-500">✔ Địa chỉ email</p>
                </div>
                <div className="md:w-2/3 md:pl-10">
                    <h2 className="text-2xl font-bold">
                        Xin chào, tôi là {userData?.name}
                    </h2>
                    <p className="text-gray-500">Bắt đầu tham gia vào 2023</p>
                    <h3 className="mt-6 text-xl font-semibold">
                        Phòng đã thuê
                    </h3>
                    {bookings.length > 0 ? (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="border rounded-lg overflow-hidden shadow-md"
                                >
                                    <img
                                        src="https://via.placeholder.com/300"
                                        alt="Phòng"
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold">
                                            {booking.roomName}
                                        </h4>
                                        <p className="text-gray-500">
                                            {booking.details}
                                        </p>
                                        <p className="font-bold">
                                            ${booking.price} / đêm
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            Không có phòng nào đã thuê.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
