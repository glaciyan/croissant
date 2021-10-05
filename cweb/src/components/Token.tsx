import React, { useState } from "react";
import { AuthenticatedResponse } from "../types/dto/authenticatedResponse";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useApi } from "../lib/useApi";

export const Token = React.createContext([]);

export const TokenProvider: React.FC = ({ children }) => {
    const router = useRouter();
    const client = useApi();

    const { data, error } = useSWR<AuthenticatedResponse>(
        "api/auth/token",
        client().noAuthFetcher()
    );

    if (error && router.pathname !== "/login") router.push("/login");

    const [token, setToken] = useState(data?.token ?? "");
    const updateToken = (value: string) => setToken(value);

    // if (!decoded?.exp || Date.now() >= decoded?.exp * 1000) {
    //     internalClient
    //         .get<AuthenticatedResponse>("api/auth/token")
    //         .then((result) => {
    //             setToken(result.data.token);
    //         })
    //         .catch((err) => {
    //             router.push("/login");
    //             return;
    //         });
    // }

    return <Token.Provider value={[token, updateToken]}>{children}</Token.Provider>;
};
