import axios from "axios";

const API_BASE_URL = "https://airbnbnew.cybersoft.edu.vn/";
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y";

// Tạo một instance Axios
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Sử dụng Interceptor để tự động thêm token vào request
apiClient.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("Không tìm thấy token, request có thể bị từ chối.");
        }
        // Thêm TokenCybersoft
        config.headers.TokenCybersoft = TOKEN_CYBERSOFT;
        return config;
    },
    (error) => Promise.reject(error)
);

// Hàm lấy danh sách phòng
export const fetchRooms = (page, limit) => {
    return apiClient.get(
        `/api/phong-thue/phan-trang-tim-kiem?page=${page}&pageSize=${limit}`
    );
};

// Hàm thêm phòng
export const addRoom = (roomData) => {
    return apiClient.post("/api/phong-thue", roomData);
};

// Hàm cập nhật phòng
export const updateRoom = (id, roomData) => {
    return apiClient.put(`/api/phong-thue/${id}`, roomData);
};

// Hàm xóa phòng
export const deleteRoom = (id) => {
    return apiClient.delete(`/api/phong-thue/${id}`);
};
