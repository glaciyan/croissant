import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { UserMan } from "./UserManager";

export type RequireUserProps = {};

export const RequireUser: React.FC<RequireUserProps> = ({ children }) => {
    const { user, isReady } = useContext(UserMan);
    const router = useRouter();

    useEffect(() => {
        if (isReady && !user) {
            router.push("/login");
        }
    }, [isReady, user]);

    if (isReady) {
        return <>{children}</>;
    } else {
        return null;
    }
};
