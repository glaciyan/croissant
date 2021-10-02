import type { NextPage } from "next";
import { Button, Center, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { Title } from "../components/Title";
import { Form, Formik } from "formik";
import { UsernameInput } from "../components/form/UsernameInput";
import { EmailInput } from "../components/form/EmailInput";
import { PasswordInput } from "../components/form/PasswordInput";
import { GeneralInput } from "../components/form/GeneralInput";

const SignUp: NextPage = () => {
    const backgroundColor = useColorModeValue([null, "gray.100"], "gray.700");
    return (
        <>
            <Title>Sign up</Title>
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
                        Let's get you started
                    </Heading>
                    <Formik
                        initialValues={{ username: "", email: "", password: "" }}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                alert("sign up");
                                actions.setSubmitting(false);
                            }, 1000);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <UsernameInput />
                                <EmailInput mt={4} />
                                <Flex mt={4} direction={["column", "row"]}>
                                    <PasswordInput />
                                    <GeneralInput
                                        ml={[0, 4]}
                                        mt={[2, 0]}
                                        nameId={"confirmPassword"}
                                        descriptor={"Confirm"}
                                        inputProps={{ type: "password" }}
                                    />
                                </Flex>

                                <Button
                                    mt={12}
                                    isFullWidth={true}
                                    colorScheme={"blue"}
                                    type={"submit"}
                                    isLoading={isSubmitting}
                                >
                                    Sign up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Flex>
            </Center>
        </>
    );
};

export default SignUp;
