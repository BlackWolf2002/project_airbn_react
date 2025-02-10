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

        if (!response.data || !response.data.content) {
            throw new Error("API không trả về dữ liệu hợp lệ.");
        }

        const { token, user } = response.data.content;

        if (!token || !user) {
            throw new Error("Dữ liệu token hoặc user không đầy đủ.");
        }

        localStorage.setItem("token", token); // Lưu token
        localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin user

        return { token, user };
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        throw error.response ? error.response.data : error;
    }
};

const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Refresh token không tồn tại.");

    const response = await axios.post(
        `${API_URL}/refresh-token`,
        { refreshToken },
        {
            headers: {
                TokenCybersoft: TOKEN_CYBERSOFT,
                "Content-Type": "application/json",
            },
        }
    );

    const { token, newRefreshToken } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", newRefreshToken);
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
