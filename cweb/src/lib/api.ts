import axios, { AxiosResponse } from "axios";

const client = axios.create({
    baseURL: "https://localhost:5001",
    withCredentials: true,
});

export const toFormikError = (errors: any): any => {
    let out = {};

    Object.entries(errors).map(([key, value]) => {
        out[key.toLowerCase()] = value[0];
    });

    return out;
};

export default {
    login: async (
        email: string,
        password: string,
        rememberMe: boolean
    ): Promise<AxiosResponse | undefined> => {
        try {
            await client.post("api/auth/login", {
                email,
                password,
                rememberMe,
            });
        } catch (e) {
            return e.response;
        }
    },
};
