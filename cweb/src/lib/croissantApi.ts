import { AxiosResponse } from "axios";
import { AuthenticatedResponse } from "../types/dto/authenticatedResponse";
import { UserForLoginDto } from "../types/dto/userForLoginDto";
import { client } from "./apiClient";

export const loginUser = async (email: string, password: string) =>
    await client.post<UserForLoginDto, AxiosResponse<AuthenticatedResponse>>(
        "api/auth/login",
        {
            email,
            password,
        }
    );
