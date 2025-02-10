import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://airbnbnew.cybersoft.edu.vn/",
    headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y"}`,
        "Content-Type": "application/json",
    },
});

export const fetchRooms = (page, limit) => {
    return apiClient.get(
        `/api/phong-thue/phan-trang-tim-kiem?page=${page}&pageSize=${limit}`
    );
};

export const addRoom = (roomData) => {
    return apiClient.post("/api/phong-thue", roomData);
};

export const updateRoom = (id, roomData) => {
    return apiClient.put(`/api/phong-thue/${id}`, roomData);
};

export const deleteRoom = (id) => {
    return apiClient.delete(`/api/phong-thue/${id}`);
};
