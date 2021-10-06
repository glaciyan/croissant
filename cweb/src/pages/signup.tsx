import { Button, Heading } from "@chakra-ui/react";
import { PageTitle } from "../components/PageTitle";
import { Form, Formik } from "formik";
import { Page } from "../types/page";
import { FocusBox } from "../components/FocusBox";

const SignUp: Page = () => {
    return (
        <>
            <PageTitle>Sign up</PageTitle>
            <FocusBox>
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
                            {/*<UsernameInput />*/}
                            {/*<EmailInput mt={4} />*/}
                            {/*<Flex mt={4} direction={["column", "row"]}>*/}
                            {/*    <PasswordInput />*/}
                            {/*    <GeneralInput*/}
                            {/*        ml={[0, 4]}*/}
                            {/*        mt={[2, 0]}*/}
                            {/*        nameId={"confirmPassword"}*/}
                            {/*        descriptor={"Confirm"}*/}
                            {/*        inputProps={{ type: "password" }}*/}
                            {/*    />*/}
                            {/*</Flex>*/}

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
