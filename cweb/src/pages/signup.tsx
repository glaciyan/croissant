import type { NextPage } from "next";
import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { Title } from "../components/Title";
import { Container } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { FormTextInput } from "../components/FormTextInput";

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
                                <FormTextInput nameId={"username"} label={"Username"} />
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
