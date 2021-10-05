import { useContext } from "react";
import { Token } from "../components/Token";
import { internalClient } from "./apiClient";
import { useRouter } from "next/router";
import { CroissantClient } from "./croissantClient";

export function useApi() {
    const [token, setToken] = useContext(Token);
    const router = useRouter();

    return (): CroissantClient => {
        return new CroissantClient(internalClient, token);
    };
}
