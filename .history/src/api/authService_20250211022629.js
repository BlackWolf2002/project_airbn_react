import axios from "axios";

const API_URL = "https://airbnbnew.cybersoft.edu.vn/api/auth";
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y";

// Hàm đăng nhập
const login = async (email, password) => {
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

        const { token, user, refreshToken } = response.data.content;

        if (!token || !user) {
            throw new Error("Dữ liệu token hoặc user không đầy đủ.");
        }

        // Xóa token cũ
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        // Lưu token và refreshToken mới
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin user

        return { token, user };
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        throw error.response ? error.response.data : error;
    }
};

export const refreshToken = async () => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (!email || !password) {
        throw new Error("Không tìm thấy thông tin đăng nhập để làm mới token.");
    }

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

        if (response.data && response.data.content) {
            const { token } = response.data.content;
            localStorage.setItem("token", token); // Lưu lại token mới
            console.log("🔄 Token đã được làm mới:", token);
            return token;
        } else {
            throw new Error("API không trả về dữ liệu token hợp lệ.");
        }
    } catch (error) {
        console.error("Lỗi khi làm mới token:", error);
        throw new Error("Không thể làm mới token. Vui lòng đăng nhập lại.");
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
