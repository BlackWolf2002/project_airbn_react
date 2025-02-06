import axios from "axios";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Token của bạn

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        TokenCybersoft: TOKEN,
        "Content-Type": "application/json",
    },
});

// Lấy danh sách người dùng
export const getUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data.content;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách user:", error);
        return [];
    }
};

// ìm kiếm người dùng
export const searchUsers = async (query) => {
    try {
        const response = await api.get(`/users/search/${query}`);
        return response.data.content;
    } catch (error) {
        console.error("Lỗi khi tìm kiếm user:", error);
        return [];
    }
};

// Thêm người dùng
export const addUser = async (userData) => {
    try {
        await api.post("/users", userData);
        return true;
    } catch (error) {
        console.error("Lỗi khi thêm user:", error);
        return false;
    }
};

// Cập nhật người dùng
export const updateUser = async (id, userData) => {
    try {
        await api.put(`/users/${id}`, userData);
        return true;
    } catch (error) {
        console.error("Lỗi khi cập nhật user:", error);
        return false;
    }
};

// Xóa người dùng
export const deleteUser = async (id) => {
    try {
        await api.delete(`/users/${id}`);
        return true;
    } catch (error) {
        console.error("Lỗi khi xóa user:", error);
        return false;
    }
};
