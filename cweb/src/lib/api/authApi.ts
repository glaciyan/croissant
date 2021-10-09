import { UserDto } from "../../types/dto/userDto";
import { UserForLoginDto } from "../../types/dto/userForLoginDto";
import { AxiosResponse } from "axios";
import { apiClient, ApiResponse } from "./api";

export default {
    login: async (
        email: string,
        password: string,
        rememberMe: boolean
    ): Promise<ApiResponse<UserDto>> => {
        try {
            const response = await apiClient.post<
                UserForLoginDto,
                AxiosResponse<UserDto>
            >("api/auth/login", {
                email,
                password,
                rememberMe,
            });

            return { success: true, response };
        } catch (e) {
            return { success: false, response: e.response };
        }
    },

    logout: async () => {
        await apiClient.post("api/auth/logout");
    },

    me: async (): Promise<ApiResponse<UserDto>> => {
        try {
            const response = await apiClient.get<undefined, AxiosResponse<UserDto>>(
                "api/users/me"
            );

            return { success: true, response };
        } catch (e) {
            return { success: false, response: e.response };
        }
    },
};
