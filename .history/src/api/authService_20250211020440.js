import axios from "axios";

const API_URL = "https://airbnbnew.cybersoft.edu.vn/api/auth";
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y";

// Hàm đăng nhập
export const login = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/signin`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                    TokenCybersoft: TOKEN_CYBERSOFT,
                },
            }
        );

        console.log("Dữ liệu trả về từ API:", response.data);

        // Kiểm tra dữ liệu trả về từ API
        if (!response.data || !response.data.content) {
            throw new Error("API không trả về dữ liệu hợp lệ.");
        }

        const { token, user } = response.data.content;

        if (!token || !user || !user.role) {
            throw new Error("Dữ liệu token hoặc thông tin user không đầy đủ.");
        }

        // Lưu token & user vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return { token, user };
    } catch (error) {
        // Xử lý lỗi API hoặc lỗi không xác định
        console.error("Lỗi đăng nhập:", error);
        const errorMessage = error.response
            ? error.response.data.message || "Lỗi từ API"
            : error.message || "Lỗi không xác định";

        throw new Error(errorMessage);
    }
};

// Hàm đăng ký
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData, {
            headers: {
                "Content-Type": "application/json",
                TokenCybersoft: TOKEN_CYBERSOFT,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        throw error.response ? error.response.data : error;
    }
};
