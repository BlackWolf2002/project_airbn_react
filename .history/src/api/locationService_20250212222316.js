import axios from "axios";

const API_BASE_URL = "https://airbnbnew.cybersoft.edu.vn/";
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        token: token,
        TokenCybersoft: TOKEN_CYBERSOFT,
        "Content-Type": "application/json",
    };
};

// Hàm lấy danh sách vị trí
export const fetchLocations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/vi-tri`, {
            headers: {
                tokenCybersoft: TOKEN_CYBERSOFT,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error(
            "Lỗi khi gọi API vị trí:",
            error.response?.data || error.message
        );
        throw error.response?.data || error;
    }
};

//Lấy chi tiết vị trí theo ID
export const getLocationById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/vi-tri/${id}`, {
            headers: getHeaders(),
        });
        return response.data.content; // Trả về dữ liệu vị trí
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết vị trí:", error);
        throw error.response?.data || error;
    }
};

//Thêm vị trí mới
export const addLocation = async (locationData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}api/vi-tri`,
            locationData,
            {
                headers: getHeaders(),
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm vị trí:", error);
        throw error.response?.data || error;
    }
};

//Xóa vị trí
export const deleteLocation = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}api/vi-tri/${id}`, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa vị trí:", error);
        throw error.response?.data || error;
    }
};

//Tìm vị trí có phân trang
export const searchLocations = async (keyword, pageIndex = 1, pageSize = 3) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}api/vi-tri/phan-trang-tim-kiem`,
            {
                params: { keyword, pageIndex, pageSize },
                headers: getHeaders(),
            }
        );
        return response.data.content;
    } catch (error) {
        console.error("Lỗi khi tìm kiếm vị trí:", error);
        throw error.response?.data || error;
    }
};

//Tải lên hình ảnh vị trí
export const uploadLocationImage = async (id, file) => {
    try {
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("maViTri", id); // Đảm bảo maViTri được gửi

        const response = await axios.post(
            `${API_BASE_URL}api/vi-tri/upload-hinh-vitri?maViTri=${id}`,
            formData,
            {
                headers: {
                    TokenCybersoft: TOKEN_CYBERSOFT,
                    token: localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("✅ Ảnh đã được tải lên thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi tải ảnh lên:", error.response?.data || error);
        throw error.response?.data || error;
    }
};

//Cập nhật ví trí
export const updateLocation = async (id, locationData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}api/vi-tri/${id}`,
            locationData,
            {
                headers: getHeaders(),
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật vị trí:", error);
        throw error.response?.data || error;
    }
};
