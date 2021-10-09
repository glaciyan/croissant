import axios, { AxiosResponse } from "axios";
import { UserDto } from "../../types/dto/userDto";
import { UserForLoginDto } from "../../types/dto/userForLoginDto";

interface ApiResponse<T> {
    success: boolean;
    response: AxiosResponse<T>;
}

const client = axios.create({
    baseURL: "https://localhost:5001",
    withCredentials: true,
});

export default {
    login: async (
        email: string,
        password: string,
        rememberMe: boolean
    ): Promise<ApiResponse<UserDto>> => {
        try {
            const response = await client.post<UserForLoginDto, AxiosResponse<UserDto>>(
                "api/auth/login",
                {
                    email,
                    password,
                    rememberMe,
                }
            );

            return { success: true, response };
        } catch (e) {
            return { success: false, response: e.response };
        }
    },
};
