import axios from "axios";

const API_BASE_URL = "https://airbnbnew.cybersoft.edu.vn/";
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y";

export const fetchRooms = async (
    pageIndex = 1,
    pageSize = 10,
    keyword = ""
) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}api/phong-thue/phan-trang-tim-kiem`,
            {
                params: {
                    pageIndex, // Số trang
                    pageSize, // Số lượng mục trên mỗi trang
                    keyword, // Từ khóa tìm kiếm (có thể rỗng)
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    tokenCybersoft: TOKEN_CYBERSOFT,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Phản hồi API:", response.data);
        return response.data; // Trả về toàn bộ phản hồi
    } catch (error) {
        console.error(
            "Lỗi khi lấy dữ liệu phòng:",
            error.response?.data || error.message
        );
        throw error.response?.data || error;
    }
};

// Hàm thêm phòng
export const addRoom = async (roomData) => {
    try {
        const token = localStorage.getItem("token"); // Token user sau khi đăng nhập
        if (!token) {
            throw new Error(
                "❌ Token user không tồn tại. Vui lòng đăng nhập lại."
            );
        }

        const headers = {
            token: token, // Token của user
            TokenCybersoft: TOKEN_CYBERSOFT, // Token cố định của Cybersoft
            "Content-Type": "application/json-patch+json", // Kiểu dữ liệu yêu cầu của API
        };

        console.log("📢 Token đang sử dụng:", token);
        console.log("📢 Dữ liệu thêm phòng:", roomData);

        const response = await axios.post(
            `${API_BASE_URL}api/phong-thue`,
            roomData,
            { headers }
        );

        console.log("✅ Phòng được thêm thành công:", response.data);
        //Sau khi thêm phòng,gọi lại API để lấy danh sách mới
        if (fetchRooms) {
            await fetchRooms();
        }
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi thêm phòng:", error.response?.data || error);
        throw error.response?.data || error;
    }
};

// Hàm cập nhật phòng
export const updateRoom = async (id, roomData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
            `${API_BASE_URL}api/phong-thue/${id}`,
            roomData,
            {
                headers: {
                    token: token,
                    TokenCybersoft: TOKEN_CYBERSOFT,
                    "Content-Type": "application/json-patch+json",
                },
            }
        );

        console.log("Phòng được cập nhật:", response.data);
        // Sau khi thêm phòng, gọi lại API để lấy danh sách mới
        if (fetchRooms) {
            await fetchRooms();
        }
        return response.data;
    } catch (error) {
        console.error(
            "Lỗi khi cập nhật phòng:",
            error.response?.data || error.message
        );
        throw error.response?.data || error;
    }
};

// Hàm xóa phòng
export const deleteRoom = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error(
                "❌ Token user không tồn tại. Vui lòng đăng nhập lại."
            );
        }

        const response = await axios.delete(
            `${API_BASE_URL}api/phong-thue/${id}`,
            {
                headers: {
                    token: token,
                    TokenCybersoft: TOKEN_CYBERSOFT,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("✅ API phản hồi sau khi xóa:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi xóa phòng:", error.response?.data || error);
        throw error.response?.data || error;
    }
};
