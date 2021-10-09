import { Spinner, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserMan } from "../components/UserManager";
import authApi from "../lib/api/authApi";

const Logout: NextPage = () => {
    const router = useRouter();
    const { setUser } = useContext(UserMan);

    useEffect(() => {
        setUser(null);
        authApi.logout();
    }, []);

    return (
        <>
            <Spinner />
            <Text>Logging you out...</Text>
        </>
    );
};

export default Logout;
