import axios from "axios";
import { isDev } from "./consts";

export const internalClient = axios.create({
    baseURL: isDev ? "https://localhost:5001" : undefined,
    withCredentials: isDev,
});

internalClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
