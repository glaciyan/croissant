import axios from "axios";
import { isDev } from "./consts";

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

export const loginUser = async (email: string, password: string) =>
    await client.post("api/auth/login", {
        email,
        password,
    });
