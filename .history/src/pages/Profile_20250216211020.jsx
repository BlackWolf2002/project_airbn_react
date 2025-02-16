import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../api/userService";
import { getUserBookings } from "../api/bookingService";
import { getRoomDetails } from "../api/roomService";
import moment from "moment";

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
            const userId = localStorage.getItem("userId");
            console.log("📢 Kiểm tra userId trong Profile:", userId);

            const data = await getUserBookings();
            console.log("✅ Danh sách phòng đã thuê:", data);

            const enrichedBookings = await Promise.all(
                data.map(async (booking) => {
                    const roomDetails = await getRoomDetails(booking.maPhong);
                    return {
                        ...booking,
                        tenPhong: roomDetails.tenPhong,
                        giaTien: roomDetails.giaTien,
                        hinhAnh: roomDetails.hinhAnh,
                        moTa: roomDetails.moTa,
                        soLuongKhach: roomDetails.khach,
                        ngayDen: moment(booking.ngayDen).format("DD/MM/YYYY"),
                        ngayDi: moment(booking.ngayDi).format("DD/MM/YYYY"),
                    };
                })
            );

            setBookings(enrichedBookings);
        } catch (error) {
            console.error("❌ Lỗi khi lấy thông tin đặt phòng:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <div className="flex flex-col md:flex-row items-center md:items-start">
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
                                    className="border rounded-lg overflow-hidden shadow-md flex"
                                >
                                    <img
                                        src={booking.hinhAnh}
                                        alt="Phòng"
                                        className="w-40 h-40 object-cover"
                                    />
                                    <div className="p-4 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-lg">
                                                {booking.tenPhong}
                                            </h4>
                                            <p className="text-gray-500 text-sm">
                                                {booking.moTa}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                {booking.soLuongKhach} khách -{" "}
                                                {booking.ngayDen} đến{" "}
                                                {booking.ngayDi}
                                            </p>
                                        </div>
                                        <p className="font-bold text-lg text-blue-600">
                                            ${booking.giaTien} / đêm
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
