import axios from "axios";
import { findToken } from "../IndexedDB/tokens.js";

const apiInterceptor = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

apiInterceptor.interceptors.request.use(
    async (config) => {
        const token = await findToken();
        if (!token) {
            return Promise.reject("Token not found");
        }
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiInterceptor;