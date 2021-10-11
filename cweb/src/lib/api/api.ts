import axios, { AxiosResponse } from "axios";
import { apiHost, isDev } from "../consts";

export interface ApiResponse<T> {
    success: boolean;
    response: AxiosResponse<T | any>;
}

export const apiClient = axios.create({
    baseURL: apiHost,
    withCredentials: isDev,
});

export const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export async function apiCall<T>(request: () => any): Promise<ApiResponse<T>> {
    try {
        const response = await request();

        return { success: true, response };
    } catch (e) {
        return { success: false, response: e.response };
    }
}
