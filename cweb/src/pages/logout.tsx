import { Center, Container, Spinner, Text, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { UserMan } from "../components/UserManager";
import authApi from "../lib/api/authApi";

const Logout: NextPage = () => {
    const router = useRouter();
    const { setUser } = useContext(UserMan);
    const toast = useToast();

    useEffect(() => {
        setUser(null);
        authApi.logout().then(() => {
            toast({
                title: "Logged out",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            router.push("/login");
        });
    }, []);

    return (
        <Container as="section" maxW="container.md">
            <Center flexDirection="column">
                <Spinner />
                <Text>Logging you out...</Text>
            </Center>
        </Container>
    );
};

export default Logout;
