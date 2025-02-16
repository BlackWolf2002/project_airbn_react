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

// 🛠  hàm getUsers lấy danh sách
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
        return response.data.content || [];
    } catch (error) {
        console.error("❌ Lỗi khi tìm kiếm user:", error);
        return [];
    }
};

// 🛠 Thêm người dùng
export const addUser = async (userData) => {
    try {
        const payload = {
            id: 0, // API yêu cầu id mặc định là 0 khi thêm mới
            name: userData.name,
            email: userData.email,
            password: userData.password || "123456", // Nếu không nhập, đặt mặc định
            phone: userData.phone,
            gender: userData.gender === "Nam" ? true : false, // Chuyển đổi gender thành boolean
            birthday: formatDate(userData.birthday), // Chuyển ngày sinh về format yyyy-MM-dd
            role: userData.role.toUpperCase(), // Đảm bảo role là "USER" hoặc "ADMIN"
        };

        console.log("📢 Dữ liệu gửi lên API:", payload);

        const response = await api.post("/users", payload);
        console.log("✅ Người dùng đã thêm thành công:", response.data);
        return true;
    } catch (error) {
        console.error("❌ Lỗi khi thêm user:", error.response?.data || error);
        return false;
    }
};

// Hàm format ngày sinh về yyyy-MM-dd
const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0]; // Format chuẩn yyyy-MM-dd
};

// 🛠 Cập nhật người dùng
export const updateUser = async (id, userData) => {
    try {
        const payload = {
            name: userData.name,
            email: userData.email,
            password: userData.password || "123456", // Nếu không nhập, đặt mặc định
            phone: userData.phone,
            gender: userData.gender === "Nam" ? true : false, // Chuyển đổi gender thành boolean
            birthday: formatDate(userData.birthday), // Chuyển ngày sinh về format yyyy-MM-dd
            role: userData.role.toUpperCase(), // Đảm bảo role là "USER" hoặc "ADMIN"
        };

        console.log("📢 Dữ liệu gửi lên API để cập nhật:", payload);

        const response = await api.put(`/users/${id}`, payload);

        console.log("✅ Cập nhật user thành công:", response.data);
        return true;
    } catch (error) {
        console.error(
            "❌ Lỗi khi cập nhật user:",
            error.response?.data || error
        );
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

// 🛠 Lấy thông tin người dùng theo ID
export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data.content;
    } catch (error) {
        console.error("❌ Lỗi khi lấy thông tin user:", error);
        throw error;
    }
};
