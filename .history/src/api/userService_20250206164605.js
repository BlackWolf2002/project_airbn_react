import axios from "axios";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        TokenCybersoft: TOKEN,
        "Content-Type": "application/json",
    },
});

//Lấy danh sách người dùng
export const getUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data.content;
    } catch (error) {
        console.log("Lỗi khi lấy danh sách user:", error);
        return [];
    }
};

//tìm kiếm người dùng
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
        console.log("Lỗi khi thêm user:", error);
        return false;
    }
};

//Cập nhật người dùng
export const updateUser = async (id, userData) => {
    try {
        await api.put(`/users/${id}`, userData);
        return true;
    } catch (error) {
        console.error("Lỗi khi cập nhật user:", error);
        return false;
    }
};

//xóa người dùng
export const deleteUser = as;
