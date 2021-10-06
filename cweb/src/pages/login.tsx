import { Button, Flex, Heading } from "@chakra-ui/react";
import { PageTitle } from "../components/PageTitle";
import { Page } from "../types/page";
import { FocusBox } from "../components/FocusBox";
import { Form, Formik } from "formik";
import { EmailInput } from "../components/form/EmailInput";
import { PasswordInput } from "../components/form/PasswordInput";
import { FormCheckbox } from "../components/form/FormCheckbox";
import NextLink from "next/link";

const Login: Page = () => {
    return (
        <>
            <PageTitle>Login</PageTitle>
            <FocusBox>
                <Heading mb={6} fontSize={"lg"} fontWeight={400} alignSelf={"center"}>
                    Welcome back
                </Heading>
                <Formik
                    initialValues={{ email: "", password: "", rememberMe: false }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert("sign up");
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <EmailInput />
                            <PasswordInput mt={4} />
                            <Flex justify={"end"}>
                                <NextLink href={"/forgot-password"}>
                                    <a className={`hover:underline`}>Forgot password?</a>
                                </NextLink>
                            </Flex>

                            <FormCheckbox
                                mt={2}
                                nameId={"rememberMe"}
                                label={"Remember me"}
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
