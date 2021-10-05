import axios from "axios";
import { isDev } from "./consts";

export const client = axios.create({
    baseURL: isDev ? "https://localhost:5001" : undefined,
    withCredentials: isDev,
});

export const fetcher = (url) =>
    client.get(url, { headers: authHeader() }).then((res) => res.data);

let accessToken = "";
export const setAccessToken = (value: string) => {
    accessToken = value;
};

const authHeader = () => {
    return { Authorization: `Bearer ${accessToken}` };
};
