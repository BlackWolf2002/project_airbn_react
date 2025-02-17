import React, { useState } from "react";
import { getUserById } from "../api/userService"; // API lấy thông tin user
import { addBooking, fetchBookings } from "../api/bookingService"; // API lấy danh sách đặt phòng và thêm đặt phòng
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomDetail = ({ room }) => {
    const [user, setUser] = useState(null);
    const [showPopup, setShowPopup] = useState(false); 
    const [checkInDate, setCheckInDate] = useState(null); 
    const [checkOutDate, setCheckOutDate] = useState(null); 
    const [guestCount, setGuestCount] = useState(1); // New state for guest count
    const [bookingId, setBookingId] = useState(null); // New state for booking ID

    const handleBooking = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("user"))?.id; 
            if (!userId) {
                alert("❌ Không tìm thấy userId! Vui lòng đăng nhập.");
                return;
            }

            const userData = await getUserById(userId);
            setUser(userData); 
            const newBookingId = await generateUniqueBookingId();
            setBookingId(newBookingId); // Set the generated booking ID
            setShowPopup(true); 
        } catch (error) {
            console.error("❌ Lỗi khi lấy thông tin người dùng:", error);
        }
    };

    const generateUniqueBookingId = async () => {
        try {
            const bookings = await fetchBookings();
            const existingBookingIds = bookings.map(booking => booking.id);
            let newBookingId;
            do {
                newBookingId = Math.floor(Math.random() * 1000000); // Generate a random booking ID
            } while (existingBookingIds.includes(newBookingId));
            return newBookingId;
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách đặt phòng:", error);
            throw error;
        }
    };

    const handleConfirmBooking = async () => {
        try {
            if (!checkInDate || !checkOutDate) {
                alert("❌ Vui lòng chọn ngày đến và ngày đi!");
                return;
            }

            const formattedCheckInDate = format(checkInDate, "dd/MM/yyyy");
            const formattedCheckOutDate = format(checkOutDate, "dd/MM/yyyy");

            const bookings = await fetchBookings(); // Gọi API lấy danh sách đặt phòng của người dùng
            console.log("📌 Danh sách Booking:", bookings);

            // Kiểm tra xem phòng có bị đặt vào khoảng thời gian đã chọn không
            const isRoomBooked = bookings.some(booking => 
                booking.maPhong === room.id &&
                (
                    (checkInDate >= new Date(booking.ngayDen) && checkInDate < new Date(booking.ngayDi)) || 
                    (checkOutDate > new Date(booking.ngayDen) && checkOutDate <= new Date(booking.ngayDi)) || 
                    (checkInDate <= new Date(booking.ngayDen) && checkOutDate >= new Date(booking.ngayDi))
                )
            );

            if (isRoomBooked) {
                alert(`⚠️ Phòng này đã được đặt từ ${formattedCheckInDate} đến ${formattedCheckOutDate}. Vui lòng chọn ngày khác.`);
                return;
            }

            // Thêm đặt phòng mới
            const bookingData = {
                id: bookingId,
                maPhong: room.id,
                ngayDen: checkInDate,
                ngayDi: checkOutDate,
                soLuongKhach: guestCount,
                maNguoiDung: user.id,
            };

            await addBooking(bookingData);
            alert(`✅ Đặt phòng thành công cho ${guestCount} khách!`);
            setShowPopup(false);

        } catch (error) {
            console.error("❌ Lỗi khi thêm đặt phòng:", error);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setCheckInDate(null); 
        setCheckOutDate(null); 
        setGuestCount(1); // Reset guest count
        setBookingId(null); // Reset booking ID
    };

    if (!room) {
        return <div className="text-center text-lg mt-10">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <img src={room.hinhAnh} alt={room.tenPhong} className="w-full h-64 object-cover rounded-lg" />
            <h1 className="text-3xl font-bold mt-4">{room.tenPhong}</h1>
            <p className="text-gray-600 mt-2">{room.moTa}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div><strong>Khách:</strong> {room.khach} người</div>
                <div><strong>Phòng ngủ:</strong> {room.phongNgu}</div>
                <div><strong>Giường:</strong> {room.giuong}</div>
                <div><strong>Phòng tắm:</strong> {room.phongTam}</div>
                <div><strong>Giá tiền:</strong> <span className="text-red-500 font-bold">{room.giaTien} VND</span></div>
            </div>

            <button 
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                onClick={handleBooking} 
            >
                Đặt ngay
            </button>

            {showPopup && user && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button 
                            className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
                            onClick={closePopup}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Xác nhận đặt phòng</h2>
                        <p><strong>Họ và tên:</strong> {user.name}</p>
                        <p><strong>Phòng:</strong> {room.tenPhong}</p>
                        <p><strong>Mã đặt phòng:</strong> {bookingId}</p> {/* Show booking ID */}
                        <p><strong>Thành tiền:</strong> <span className="text-red-500 font-bold">{room.giaTien} VND</span></p>
                        <p><strong>Số điện thoại:</strong> {user.phone}</p>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Ngày đến:</label>
                            <DatePicker
                                selected={checkInDate}
                                onChange={(date) => setCheckInDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="w-full border p-2 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Ngày đi:</label>
                            <DatePicker
                                selected={checkOutDate}
                                onChange={(date) => setCheckOutDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="w-full border p-2 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Số lượng khách:</label>
                            <input
                                type="number"
                                value={guestCount}
                                onChange={(e) => setGuestCount(e.target.value)}
                                className="w-full border p-2 rounded-lg"
                                min="1"
                                max={room.khach}
                                required
                            />
                        </div>

                        <button 
                            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                            onClick={handleConfirmBooking} 
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetail;