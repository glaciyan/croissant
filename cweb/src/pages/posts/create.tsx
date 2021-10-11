import { Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import React from "react";
import { FocusBox } from "../../components/FocusBox";
import { FormTextInput } from "../../components/form/FormTextInput";
import { PageTitle } from "../../components/PageTitle";
import { RequireUser } from "../../components/RequireUser";

const CreatePost: NextPage = () => {
    return (
        <RequireUser>
            <PageTitle>New Post</PageTitle>
            <FocusBox>
                <Heading mb={6} fontSize={"lg"} fontWeight={400} alignSelf={"center"}>
                    New Post
                </Heading>
                <Formik
                    initialValues={{ title: "", content: "" }}
                    onSubmit={() => console.log("submitting")}
                >
                    {({ isSubmitting }) => {
                        <Form>
                            <FormTextInput name="title" placeholder="Title" />
                            <Button
                                mt={4}
                                isFullWidth={true}
                                colorScheme={"blue"}
                                type={"submit"}
                                isLoading={isSubmitting}
                            >
                                Create Post
                            </Button>
                        </Form>;
                    }}
                </Formik>
            </FocusBox>
        </RequireUser>
    );
};

export default CreatePost;
