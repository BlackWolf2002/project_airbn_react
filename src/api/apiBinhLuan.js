import axios from "axios";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api/binh-luan";
const TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y";

export const getBinhLuanTheoPhong = async (maPhong) => {
    try {
        const response = await axios.get(`${BASE_URL}/lay-binh-luan-theo-phong/${maPhong}`, {
            headers: {
                tokenCybersoft: TOKEN,
            },
        });

        return response.data.content; // Trả về dữ liệu bình luận
    } catch (error) {
        console.error("❌ Lỗi khi lấy bình luận:", error);
        return null; // Trả về null nếu có lỗi
    }
};