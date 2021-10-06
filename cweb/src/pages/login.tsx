import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { PageTitle } from "../components/PageTitle";
import { Page } from "../types/page";
import { FocusBox } from "../components/FocusBox";
import { Form, Formik } from "formik";
import { FormCheckbox } from "../components/form/FormCheckbox";
import NextLink from "next/link";
import api, { toFormikError } from "../lib/api";
import { useRouter } from "next/router";
import { StatusCodes } from "../lib/statusCodes";
import { FormTextInput } from "../components/form/FormTextInput";

const Login: Page = () => {
    const toast = useToast();
    const router = useRouter();

    return (
        <>
            <PageTitle>Login</PageTitle>
            <FocusBox>
                <Heading mb={6} fontSize={"lg"} fontWeight={400} alignSelf={"center"}>
                    Welcome back
                </Heading>
                <Formik
                    initialValues={{ email: "", password: "", rememberMe: true }}
                    onSubmit={async (values, actions) => {
                        const errorResponse = await api.login(
                            values.email,
                            values.password,
                            values.rememberMe
                        );

                        if (errorResponse) {
                            if (
                                errorResponse.status === StatusCodes.Status401Unauthorized
                            ) {
                                toast({
                                    title: "Login failed",
                                    description: "Email or password is incorrect",
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                                    position: "top",
                                });
                            } else if (
                                errorResponse.status ===
                                StatusCodes.Status422UnprocessableEntity
                            ) {
                                actions.setErrors(toFormikError(errorResponse.data));
                            }
                        } else {
                            // await router.push("/");
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <FormTextInput
                                name={"email"}
                                placeholder={"Email"}
                                type={"email"}
                            />
                            <FormTextInput
                                mt={4}
                                name={"password"}
                                placeholder={"Password"}
                                type={"password"}
                            />

                            <Flex justify={"end"}>
                                <NextLink href={"/forgot-password"}>
                                    <a className={`hover:underline`}>Forgot password</a>
                                </NextLink>
                            </Flex>

                            <FormCheckbox
                                mt={2}
                                nameId={"rememberMe"}
                                label={"Remember me"}
                                checkBoxProps={{ defaultChecked: true }}
                            />
                            <Button
                                mt={4}
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
            </FocusBox>
        </>
    );
};

Login.layout = null;

export default Login;
