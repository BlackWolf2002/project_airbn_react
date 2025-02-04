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

// ✅ API lấy danh sách địa điểm (CẦN TRUYỀN THAM SỐ)
export const getLocations = async () => {
    try {
        const response = await api.get("/vi-tri/phan-trang-tim-kiem", {
            params: { pageIndex: 1, pageSize: 10 },
        });
        return response.data.content.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách địa điểm:", error);
        return [];
    }
};

// ✅ API lấy danh sách phòng (CẦN TRUYỀN THAM SỐ)
export const getRooms = async () => {
    try {
        const response = await api.get("/phong-thue/phan-trang-tim-kiem", {
            params: { pageIndex: 1, pageSize: 8 },
        });
        return response.data.content.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách phòng:", error);
        return [];
    }
};

// ✅ API tìm kiếm địa điểm (NẾU NGƯỜI DÙNG NHẬP)
export const searchLocations = async (query) => {
    try {
        const response = await api.get("/vi-tri", {
            params: { tenViTri: query },
        });
        return response.data.content;
    } catch (error) {
        console.error("❌ Lỗi khi tìm kiếm địa điểm:", error);
        return [];
    }
};
