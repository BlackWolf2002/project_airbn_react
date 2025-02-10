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
const decodeToken = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
};

const isTokenExpired = (token) => {
    const { exp } = decodeToken(token);
    return Date.now() >= exp * 1000;
};

const getHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
        throw new Error(
            "Token không tồn tại hoặc đã hết hạn. Vui lòng đăng nhập lại."
        );
    }
    return {
        Authorization: `Bearer ${token}`,
        TokenCybersoft: TOKEN_CYBERSOFT,
        "Content-Type": "application/json",
    };
};
// Hàm thêm phòng
export const addRoom = async (roomData) => {
    try {
        const headers = getHeaders();
        console.log("Dữ liệu thêm phòng:", roomData);

        const response = await axios.post(
            `${API_BASE_URL}api/phong-thue`,
            roomData,
            { headers }
        );

        console.log("Phòng được thêm thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm phòng:", error.response?.data || error);
        throw error.response ? error.response.data : error;
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
                    Authorization: `Bearer ${token}`,
                    TokenCybersoft: TOKEN_CYBERSOFT,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Phòng được cập nhật:", response.data);
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
        const response = await axios.delete(
            `${API_BASE_URL}api/phong-thue/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    TokenCybersoft: TOKEN_CYBERSOFT,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Phòng đã xóa:", response.data);
        return response.data;
    } catch (error) {
        console.error(
            "Lỗi khi xóa phòng:",
            error.response?.data || error.message
        );
        throw error.response?.data || error;
    }
};
