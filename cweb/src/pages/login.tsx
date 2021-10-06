import type { NextPage } from "next";
import { Text } from "@chakra-ui/react";
import { PageTitle } from "../components/PageTitle";

const Login: NextPage = () => {
    return (
        <>
            <PageTitle>Login</PageTitle>
            <Text>Log in</Text>
        </>
    );
};

export default Login;
