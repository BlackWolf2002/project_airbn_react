import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../api/userService";
import { getUserBookings } from "../api/bookingService";
import { getRoomDetails } from "../api/roomService";
import moment from "moment";

const Profile = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        phone: "",
        birthday: "",
    });

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
            setEditData({
                name: data.name,
                email: data.email,
                phone: data.phone,
                birthday: moment(data.birthday).format("YYYY-MM-DD"),
            });
        } catch (error) {
            console.error("Lỗi khi lấy thông tin user:", error);
        }
    };

    const fetchUserBookings = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const data = await getUserBookings();
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
                        phongNgu: roomDetails.phongNgu,
                        giuong: roomDetails.giuong,
                        phongTam: roomDetails.phongTam,
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

    // ✅ Hàm Đăng xuất - Xóa toàn bộ localStorage
    const handleLogout = () => {
        localStorage.clear(); // 🔥 Xóa toàn bộ dữ liệu trong localStorage
        sessionStorage.clear(); // 🔥 Xóa cả sessionStorage nếu cần
        logoutUser(); // 🛑 Gọi hàm đăng xuất từ context (xóa user trong state)
        navigate("/login"); // 👉 Chuyển hướng về trang đăng nhập
    };

    const handleEditSubmit = async () => {
        try {
            const updatedUser = {
                ...editData,
                role: userData?.role ? userData.role.toUpperCase() : "USER", // Đảm bảo role không bị undefined
            };

            await updateUser(user.id, updatedUser);
            setIsEditing(false);
            fetchUserDetails();
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật thông tin user:", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="md:w-1/3 p-4 border-r">
                    <h2 className="text-2xl font-bold">
                        Xin chào, tôi là {userData?.name}
                    </h2>
                    <p className="text-gray-500">Bắt đầu tham gia vào 2023</p>
                    {isEditing ? (
                        <div className="mt-4">
                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Tên"
                            />
                            <input
                                type="email"
                                value={editData.email}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded mt-2"
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                value={editData.phone}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded mt-2"
                                placeholder="Số điện thoại"
                            />
                            <input
                                type="date"
                                value={editData.birthday}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        birthday: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded mt-2"
                            />
                            <button
                                onClick={handleEditSubmit}
                                className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Chỉnh sửa hồ sơ
                        </button>
                    )}
                    <button
                        onClick={handleLogout} // ✅ Gọi hàm handleLogout mới
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                        Đăng xuất
                    </button>
                </div>
                <div className="md:w-2/3 md:pl-10">
                    <h3 className="mt-6 text-xl font-semibold">
                        Phòng đã thuê
                    </h3>
                    {bookings.length > 0 ? (
                        <div className="mt-4 space-y-4">
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
                                                {booking.phongNgu} phòng ngủ -{" "}
                                                {booking.giuong} giường -{" "}
                                                {booking.phongTam} phòng tắm
                                            </p>
                                            <p className="text-gray-500 text-sm">
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
