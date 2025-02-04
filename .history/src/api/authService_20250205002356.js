import axios from "axios";

const API_URL = "https://airbnbnew.cybersoft.edu.vn/api/auth";

// Hàm đăng nhập
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, {
            email,
            password,
        });
        return response.data; // Trả về dữ liệu người dùng và token
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Đăng ký
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData, {
            headers: {
                "Content-Type": "application/json",
                TokenCybersoft: "YOUR_TOKEN_HERE", // Token nếu API yêu cầu
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
