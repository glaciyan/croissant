import { Button, Flex, Heading, HStack, useToast } from "@chakra-ui/react";
import { PageTitle } from "../components/PageTitle";
import { Form, Formik } from "formik";
import { Page } from "../types/page";
import { FocusBox } from "../components/FocusBox";
import { FormTextInput } from "../components/form/FormTextInput";
import React from "react";
import authApi from "../lib/api/authApi";
import { useRouter } from "next/router";
import { StatusCodes } from "../lib/statusCodes";
import { toFormikError } from "../lib/api/util";
import * as Yup from "yup";

const SignUp: Page = () => {
    const toast = useToast();
    const router = useRouter();
    return (
        <>
            <PageTitle>Sign up</PageTitle>
            <FocusBox>
                <Heading mb={6} fontSize={"lg"} fontWeight={400} alignSelf={"center"}>
                    Let's get you started
                </Heading>
                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required("Enter a username"),
                        email: Yup.string()
                            .email("Enter a valid email")
                            .required("An email is required"),
                        password: Yup.string()
                            .required("Enter a password")
                            .min(6, "Password must be at least 6 characters"),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref("password"), null], "Password does not match")
                            .required("Confirm your password"),
                    })}
                    validateOnChange={false}
                    validateOnBlur={true}
                    onSubmit={async (values, actions) => {
                        const { success, response } = await authApi.register(
                            values.username,
                            values.email,
                            values.password
                        );

                        if (success) {
                            toast({
                                title: "Account created!",
                                description:
                                    "Your account has been created now you just need to log in",
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                            });

                            router.push("/login");
                        } else if (
                            response.status === StatusCodes.Status422UnprocessableEntity
                        ) {
                            actions.setErrors(toFormikError(response.data));
                        } else {
                            toast({
                                title: "Creating account failed",
                                description:
                                    "Something went wrong when you created your account",
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                            });
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <FormTextInput name="username" placeholder="Username" />
                            <FormTextInput
                                mt={4}
                                name="email"
                                placeholder="Email"
                                type="email"
                            />
                            <HStack mt={4} alignItems="start">
                                <FormTextInput
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                />
                                <FormTextInput
                                    name="confirmPassword"
                                    placeholder="Confirm"
                                    type="password"
                                />
                            </HStack>

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
            </FocusBox>
        </>
    );
};

SignUp.layout = null;

export default SignUp;
