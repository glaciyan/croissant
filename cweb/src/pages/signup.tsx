import type { NextPage } from "next";
import { Button, Center } from "@chakra-ui/react";
import { Title } from "../components/Title";
import { Container } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { FormTextInput } from "../components/form/FormTextInput";

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
                                <FormTextInput
                                    nameId={"username"}
                                    label={"Username"}
                                    inputProps={{ type: "text", autoCapitalize: "off" }}
                                />
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
