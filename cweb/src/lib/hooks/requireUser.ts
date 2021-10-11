import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserMan } from "../../components/UserManager";

export function useRequireUser() {
    const { user, isReady } = useContext(UserMan);
    const router = useRouter();

    useEffect(() => {
        if (isReady && !user) {
            router.push("/login");
        }
    }, [isReady, user]);

    return { user, loggedIn: isReady && user };
}
