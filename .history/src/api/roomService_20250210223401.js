import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://airbnbnew.cybersoft.edu.vn/",
    headers: {
        Authorization: `Bearer ${""}`,
    },
});
