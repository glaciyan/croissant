import { Button, Center, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { Title } from "../components/Title";
import { Page } from "../types/page";
import { Form, Formik } from "formik";
import { PasswordInput } from "../components/form/PasswordInput";
import { EmailInput } from "../components/form/EmailInput";
import { useContext } from "react";
import { Token } from "../components/Token";
import router from "next/router";
import { useApi } from "../lib/useApi";

const Login: Page = () => {
    const backgroundColor = useColorModeValue([null, "gray.100"], "gray.700");
    const [, updateToken] = useContext(Token);
    const client = useApi();

    return (
        <>
            <Title>Login</Title>
            <Center h={{ md: "60vh" }}>
                <Flex
                    direction={"column"}
                    maxW={[null, "sm"]}
                    w={["100%", null]}
                    background={backgroundColor}
                    px={{ base: 2, sm: 6 }}
                    py={6}
                    rounded={"lg"}
                >
                    <Heading mb={6} fontSize={"lg"} fontWeight={400} alignSelf={"center"}>
                        Welcome back
                    </Heading>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={async (values, actions) => {
                            try {
                                const response = await client().loginUser(
                                    values.email,
                                    values.password
                                );

                                updateToken(response.data.token);
                                router.push("/");
                            } catch (err) {
                                console.log(err.response.data);
                                actions.setErrors(err.response.data);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <EmailInput />
                                <PasswordInput mt={4} />

                                <Button
                                    mt={12}
                                    isFullWidth={true}
                                    colorScheme={"blue"}
                                    type={"submit"}
                                    isLoading={isSubmitting}
                                >
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Button isFullWidth mt={2} onClick={async () => {}}>
                        Get Me
                    </Button>
                </Flex>
            </Center>
        </>
    );
};

Login.layout = null;

export default Login;
