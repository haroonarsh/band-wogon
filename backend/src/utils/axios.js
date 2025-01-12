import axios from "axios";
import { response } from "express";

const api = axios.create({ baseURL: '/api' });

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const res = await axios.post('/api/auth/refresh');
            api.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
)

export default api;