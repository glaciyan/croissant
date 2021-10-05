import axios from "axios";
import { isDev } from "./consts";

export let session: string = "";

const authHeader = () => {
    return { Authorization: `Bearer ${session}` };
};

const client = axios.create({
    baseURL: isDev ? "https://localhost:5001" : undefined,
    withCredentials: isDev,
});

export const registerUser = async (username: string, email: string, password: string) =>
    await client.post("api/auth/register", {
        username,
        email,
        password,
    });

export const loginUser = async (email: string, password: string) => {
    const response = await client.post("api/auth/login", {
        email,
        password,
    });

    if (response.data.token) session = response.data.token;

    return response;
};

export const getMe = async () =>
    await client.get("api/users/me", { headers: authHeader() });
