import axios from "axios";

const API_URL = "https://airbnbnew.cybersoft.edu.vn/api/auth";

// Hàm đăng nhập
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Hàm đăng ký
export const register = async (userData) => {
    try {
    } catch (error) {
        throw error.res;
    }
};
