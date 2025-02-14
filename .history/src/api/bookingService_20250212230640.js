import axios from "axios";

const API_BASE_URL = "https://airbnbnew.cybersoft.edu.vn/";
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y";

const getHeaders = () => ({
    tokenCybersoft: TOKEN_CYBERSOFT,
    "Content-Type": "application/json",
});

//Lấy danh sách booking (phân trang)
export const fetchBookings = async (pageIndex = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/dat-phong`, {
            headers: getHeaders(),
            params: { pageIndex, pageSize },
        });
        return response.data.content;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách Booking:", error);
        throw error.response?.data || error;
    }
};
