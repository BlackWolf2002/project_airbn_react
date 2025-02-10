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
        // Chuyển đổi các tham số về dạng số
        pageIndex = Number(pageIndex);
        pageSize = Number(pageSize);

        if (pageIndex <= 0 || pageSize <= 0) {
            throw new Error("Tham số pageIndex và pageSize phải lớn hơn 0.");
        }

        console.log(
            "Gọi API với pageIndex:",
            pageIndex,
            "pageSize:",
            pageSize,
            "keyword:",
            keyword
        );

        const response = await axios.get(
            `${API_BASE_URL}api/phong-thue/phan-trang-tim-kiem`,
            {
                params: {
                    pageIndex, // Số trang
                    pageSize, // Số lượng mục trên mỗi trang
                    keyword, // Từ khóa tìm kiếm
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    tokenCybersoft: TOKEN_CYBERSOFT, // Bắt buộc
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Dữ liệu trả về từ API:", response.data);
        return response.data;
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
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${API_BASE_URL}api/phong-thue`,
            roomData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    TokenCybersoft: TOKEN_CYBERSOFT,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Phòng được thêm:", response.data);
        return response.data;
    } catch (error) {
        console.error(
            "Lỗi khi thêm phòng:",
            error.response?.data || error.message
        );
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
