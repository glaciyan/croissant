import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { FocusBox } from "../components/FocusBox";
import { FormCheckbox } from "../components/form/FormCheckbox";
import { FormTextInput } from "../components/form/FormTextInput";
import { PageTitle } from "../components/PageTitle";
import { User } from "../components/UserManager";
import authApi from "../lib/api/authApi";
import { toFormikError } from "../lib/api/util";
import { StatusCodes } from "../lib/statusCodes";
import { UserDto } from "../types/dto/userDto";
import { Page } from "../types/page";

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
                <User>
                    {({ setUser }) => (
                        <Formik
                            initialValues={{ email: "", password: "", rememberMe: true }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email("Enter a valid email")
                                    .required("An email is required"),
                                password: Yup.string().required("Enter a password"),
                            })}
                            validateOnChange={false}
                            validateOnBlur={true}
                            onSubmit={async (values, actions) => {
                                const apiResponse = await authApi.login(
                                    values.email,
                                    values.password,
                                    values.rememberMe
                                );

                                if (apiResponse.success) {
                                    const data = apiResponse.response.data as UserDto;
                                    setUser({ id: data.id, username: data.username });
                                    await router.push("/");
                                } else {
                                    if (
                                        apiResponse.response.status ===
                                        StatusCodes.Status401Unauthorized
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
                                        apiResponse.response.status ===
                                        StatusCodes.Status422UnprocessableEntity
                                    ) {
                                        actions.setErrors(
                                            toFormikError(apiResponse.response.data)
                                        );
                                    }
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
                                            <a className={`hover:underline`}>
                                                Forgot password
                                            </a>
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
                    )}
                </User>
            </FocusBox>
        </>
    );
};

Login.layout = null;

export default Login;
