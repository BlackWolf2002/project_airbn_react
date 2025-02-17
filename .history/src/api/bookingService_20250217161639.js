import axios from "axios";

const API_BASE_URL = "https://airbnbnew.cybersoft.edu.vn/";
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y";

const getHeaders = () => ({
    tokenCybersoft: TOKEN_CYBERSOFT,
    "Content-Type": "application/json",
});

// Lấy danh sách booking
export const fetchBookings = async (pageIndex = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/dat-phong`, {
            headers: getHeaders(),
            params: { pageIndex, pageSize },
        });
        return response.data.content;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách booking:", error);
        throw error;
    }
};

// Lấy thông tin đặt phòng theo ID
export const getBookingById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/dat-phong/${id}`, {
            headers: getHeaders(),
        });
        return response.data.content;
    } catch (error) {
        console.error("Lỗi khi lấy booking:", error);
        throw error;
    }
};

// Thêm booking mới
export const addBooking = async (bookingData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}api/dat-phong`,
            bookingData,
            {
                headers: getHeaders(),
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm booking:", error);
        throw error;
    }
};

// Cập nhật booking
export const updateBooking = async (id, bookingData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}api/dat-phong/${id}`,
            bookingData,
            {
                headers: getHeaders(),
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật booking:", error);
        throw error;
    }
};

// Xóa booking
export const deleteBooking = async (id) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}api/dat-phong/${id}`,
            {
                headers: getHeaders(),
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa booking:", error);
        throw error;
    }
};

export const getUserBookings = async () => {
    try {
        const userId = localStorage.getItem("userId");
        console.log("📢 Calling API with UserId:", userId);

        if (!userId) {
            throw new Error("❌ User ID not found, please log in again.");
        }

        const response = await axios.get(
            `${API_BASE_URL}api/dat-phong/lay-theo-nguoi-dung/${userId}`,
            {
                headers: {
                    tokenCybersoft: TOKEN_CYBERSOFT,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status !== 200 || !response.data.content) {
            throw new Error(`❌ Error: No data found for userId: ${userId}`);
        }

        console.log("✅ API Response:", response.data);

        return response.data.content;
    } catch (error) {
        console.error(
            "❌ Error fetching user bookings:",
            error.response?.data || error.message
        );
        throw error.response?.data || error.message;
    }
};
