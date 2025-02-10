import { fetchLocations } from "../api/locationService"; // Import service

const [locations, setLocations] = useState([]);

// Hàm lấy danh sách vị trí
const fetchLocationData = async () => {
    try {
        const response = await fetchLocations();
        console.log("Dữ liệu vị trí:", response.content);
        setLocations(response.content); // Lưu danh sách vị trí
    } catch (error) {
        console.error("Lỗi khi lấy danh sách vị trí:", error);
    }
};
