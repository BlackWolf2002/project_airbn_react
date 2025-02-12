import axios from "axios";

const API_BASE_URL = "https://airbnbnew.cybersoft.edu.vn/";
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y";

// Hàm lấy danh sách vị trí
export const fetchLocations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/vi-tri`, {
            headers: {
                tokenCybersoft: TOKEN_CYBERSOFT,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error(
            "Lỗi khi gọi API vị trí:",
            error.response?.data || error.message
        );
        throw error.response?.data || error;
    }
};

//Lấy chi tiết vị trí theo ID
export const getLocationById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/vi-tri/${id}`, {});
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết vị trí", error);
        throw error.response?.data || error;
    }
};
