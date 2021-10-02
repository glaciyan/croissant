import type {NextPage} from "next";
import {Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Text} from "@chakra-ui/react";
import {Title} from "../components/Title";
import {Container} from "@chakra-ui/layout";
import {Form, Formik, Field} from "formik";

const SignUp: NextPage = () => {
    return (<>
        <Title>Sign up</Title>
        <Center>
            <Container maxW={"sm"}>
                <Formik initialValues={{username: "", email: "", password: ""}} onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert("sign up")
                        actions.setSubmitting(false);
                    }, 1000)
                }}>
                    {(props) => (
                        <Form>
                            <Field name={"username"}>
                                {({field, form}) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel htmlFor={"username"}>
                                            Username
                                        </FormLabel>
                                        <Input {...field} id={"username"}/>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Button mt={4} type={"submit"} isLoading={props.isSubmitting}>Sign up</Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Center>
    </>);
}

export default SignUp;