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

// Lấy danh sách địa điểm
export const getLocations = async () => {
    try {
        const response = await api.get("/vi-tri/phan-trang-tim-kiem");
        return response.data.content.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách địa điểm:", error);
        return [];
    }
};

// Lấy danh sách phòng
export const getRooms = async () => {
    try {
        const response = await api.get("/phong-thue/phan-trang-tim-kiem");
        return response.data.content.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng:", error);
        return [];
    }
};

// API lấy danh sách địa điểm tìm kiếm
export const getLocations = async (query) => {
    try {
        const response = await api.get(`/vi-tri?tenViTri=${query}`);
        return response.data.content;
    } catch (error) {
        console.error("Lỗi lấy danh sách địa điểm:", error);
        return [];
    }
};
