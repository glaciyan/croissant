import { Button, Center, Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FormTextInput } from "../../components/form/FormTextInput";
import { PageTitle } from "../../components/PageTitle";
import postApi from "../../lib/api/postApi";
import { useRequireUser } from "../../lib/hooks/requireUser";
import * as Yup from "yup";
import { StatusCodes } from "../../lib/statusCodes";
import { toFormikError } from "../../lib/api/util";

const CreatePost: NextPage = () => {
    const { loggedIn } = useRequireUser();
    const router = useRouter();
    const toast = useToast();

    if (!loggedIn) {
        return (
            <>
                <PageTitle>Loading</PageTitle>
                <Center>
                    <Spinner />
                </Center>
            </>
        );
    }

    return (
        <>
            <PageTitle>New Post</PageTitle>
            <Center>
                <Flex
                    direction={"column"}
                    maxW={[null, "container.md"]}
                    w={["100%", null]}
                    px={{ base: 2, sm: 6 }}
                    py={6}
                    rounded={"lg"}
                >
                    <Heading mb={6} fontSize={"lg"} fontWeight={400}>
                        New Post
                    </Heading>
                    <Formik
                        initialValues={{ title: "", content: "" }}
                        validationSchema={Yup.object().shape({
                            title: Yup.string()
                                .required("A title is required")
                                .min(3, "Post title has to be a least 3 characters long")
                                .max(70, "Title can't be over 70 characters"),
                            content: Yup.string()
                                .required("Post content is required")
                                .min(3, "Post has to be a least 3 characters long")
                                .max(200, "Post can't be over 200 characters"),
                        })}
                        validateOnChange={false}
                        validateOnBlur={true}
                        onSubmit={async (values, actions) => {
                            const { success, response } = await postApi.create(
                                values.title,
                                values.content
                            );

                            if (success) {
                                toast({
                                    title: "Post created!",
                                    description: "Your post has been created",
                                    status: "success",
                                    duration: 5000,
                                    isClosable: true,
                                    position: "top",
                                });

                                router.push("/");
                            } else if (
                                response.status ===
                                StatusCodes.Status422UnprocessableEntity
                            ) {
                                actions.setErrors(toFormikError(response.data));
                            } else {
                                toast({
                                    title: "Creating post failed",
                                    description:
                                        "Something went wrong when you created your post",
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
                                <FormTextInput name="title" placeholder="Title" />
                                <FormTextInput
                                    mt={2}
                                    name="content"
                                    placeholder="What is your post about?"
                                    as="textarea"
                                    h={28}
                                    py={2}
                                />
                                <Button
                                    mt={4}
                                    colorScheme={"blue"}
                                    type={"submit"}
                                    isLoading={isSubmitting}
                                    justifySelf="flex-end"
                                >
                                    Create Post
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Flex>
            </Center>
        </>
    );
};

export default CreatePost;
