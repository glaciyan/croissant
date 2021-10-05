import { UserForLoginDto } from "../types/dto/userForLoginDto";
import { AxiosInstance, AxiosResponse } from "axios";
import { AuthenticatedResponse } from "../types/dto/authenticatedResponse";
import { authHeader } from "./authHeader";

export class CroissantClient {
    client: AxiosInstance;
    auth?: string;

    constructor(client: AxiosInstance, auth?: string) {
        this.client = client;
        this.auth = auth;
    }

    noAuthFetcher() {
        return (url) => this.client.get(url).then((res) => res.data);
    }

    fetcher() {
        return (url) =>
            this.client
                .get(url, { headers: authHeader(this.auth) })
                .then((res) => res.data);
    }

    loginUser = async (email: string, password: string) =>
        await this.client.post<UserForLoginDto, AxiosResponse<AuthenticatedResponse>>(
            "api/auth/login",
            {
                email,
                password,
            }
        );
}
