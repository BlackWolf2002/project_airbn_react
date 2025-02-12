import axios from "axios";

const API_BASE_URL = "https://airbnbnew.cybersoft.edu.vn/";
const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Token Cybersoft

const getHeaders = () => ({
    tokenCybersoft: TOKEN_CYBERSOFT,
    "Content-Type": "application/json",
});

// Lấy danh sách booking (phân trang)
export const fetchBookings = async (pageIndex = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/dat-phong`, {
            headers: getHeaders(),
            params: { pageIndex, pageSize },
        });
        return response.data.content;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách booking:", error);
        throw error.response?.data || error;
    }
};

// Lấy chi tiết booking theo ID
export const getBookingById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/dat-phong/${id}`, {
            headers: getHeaders(),
        });
        return response.data.content;
    } catch (error) {
        console.error("Lỗi khi lấy booking:", error);
        throw error.response?.data || error;
    }
};

// Thêm mới booking
export const addBooking = async (bookingData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}api/dat-phong`,
            bookingData,
            { headers: getHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm booking:", error);
        throw error.response?.data || error;
    }
};

// Cập nhật booking
export const updateBooking = async (id, bookingData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}api/dat-phong/${id}`,
            bookingData,
            { headers: getHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật booking:", error);
        throw error.response?.data || error;
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
        throw error.response?.data || error;
    }
};
