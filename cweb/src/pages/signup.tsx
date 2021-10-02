import type { NextPage } from "next";
import { Button, Center } from "@chakra-ui/react";
import { Title } from "../components/Title";
import { Container } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { UsernameInput } from "../components/form/UsernameInput";
import { EmailInput } from "../components/form/EmailInput";
import { PasswordInput } from "../components/form/PasswordInput";

const SignUp: NextPage = () => {
    return (
        <>
            <Title>Sign up</Title>
            <Center>
                <Container maxW={"sm"}>
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
                                <UsernameInput label />
                                <EmailInput mt={4} label />
                                <PasswordInput mt={4} label />

                                <Button mt={4} type={"submit"} isLoading={isSubmitting}>
                                    Sign up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Center>
        </>
    );
};

export default SignUp;
