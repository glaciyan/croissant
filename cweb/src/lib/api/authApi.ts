import { AxiosResponse } from "axios";
import { UserDto } from "../../types/dto/userDto";
import { UserForLoginDto } from "../../types/dto/userForLoginDto";
import { apiCall, apiClient } from "./api";

export default {
    login: async (email: string, password: string, rememberMe: boolean) => {
        return await apiCall<UserDto>(() =>
            apiClient.post<UserForLoginDto, AxiosResponse<UserDto>>("api/auth/login", {
                email,
                password,
                rememberMe,
            })
        );
    },

    register: async (username: string, email: string, password: string) => {
        return await apiCall(() =>
            apiClient.post("api/auth/register", {
                username,
                email,
                password,
            })
        );
    },

    logout: async () => {
        await apiClient.post("api/auth/logout");
    },

    me: async () => {
        return await apiCall<UserDto>(() =>
            apiClient.get<undefined, AxiosResponse<UserDto>>("api/users/me")
        );
    },
};
