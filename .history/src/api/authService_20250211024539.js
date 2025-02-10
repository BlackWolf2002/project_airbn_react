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

        if (response.data && response.data.content) {
            const { token, user } = response.data.content;

            // 🛠 Xóa token cũ trước khi lưu token mới
            localStorage.removeItem("token");
            localStorage.removeItem("USER");
            localStorage.removeItem("email");
            localStorage.removeItem("password");

            // 🔄 Lưu token mới
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);

            console.log("✅ Đăng nhập thành công:", user);
            return { token, user };
        } else {
            throw new Error("Đăng nhập thất bại.");
        }
    } catch (error) {
        console.error("❌ Lỗi đăng nhập:", error);
        throw error.response ? error.response.data : error;
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
