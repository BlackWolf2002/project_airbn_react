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

// 🛠 Sửa hàm getUsers với đúng API endpoint
export const getUsers = async (page = 1, pageSize = 10) => {
    try {
        const response = await api.get(
            `/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}`
        );

        console.log("📢 Dữ liệu User từ API:", response.data); // Debug xem API có trả về dữ liệu không

        if (response.data?.content?.data) {
            return {
                data: response.data.content.data, // Lấy danh sách user từ API
                totalRow: response.data.content.totalRow || 0, // Số lượng user tổng cộng
            };
        } else {
            console.warn("⚠️ API không trả về user hoặc lỗi dữ liệu");
            return { data: [], totalRow: 0 };
        }
    } catch (error) {
        console.error("❌ Lỗi lấy danh sách User:", error);
        return { data: [], totalRow: 0 };
    }
};

// 🛠 Tìm kiếm người dùng
export const searchUsers = async (query) => {
    try {
        const response = await api.get(`/users/search/${query}`);
        return response.data.content;
    } catch (error) {
        console.error("❌ Lỗi khi tìm kiếm user:", error);
        return [];
    }
};

// 🛠 Thêm người dùng
export const addUser = async (userData) => {
    try {
        await api.post("/users", userData);
        return true;
    } catch (error) {
        console.error("❌ Lỗi khi thêm user:", error);
        return false;
    }
};

// 🛠 Cập nhật người dùng
export const updateUser = async (id, userData) => {
    try {
        await api.put(`/users/${id}`, userData);
        return true;
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật user:", error);
        return false;
    }
};

// 🛠 Xóa người dùng
export const deleteUser = async (id) => {
    try {
        console.log(`📢 Đang gọi API xóa user với ID: ${id}`);

        const response = await api.delete(`/users?id=${id}`);
        console.log("✅ API phản hồi khi xóa:", response);

        return true;
    } catch (error) {
        console.error("❌ Lỗi khi xóa user:", error);
        return false;
    }
};
