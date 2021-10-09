import axios, { AxiosResponse } from "axios";

export interface ApiResponse<T> {
    success: boolean;
    response: AxiosResponse<T | any>;
}

export const apiClient = axios.create({
    baseURL: "https://localhost:5001",
    withCredentials: true,
});
