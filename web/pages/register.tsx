import { Form, Formik } from "formik";
import React from "react";
import { CField } from "../components/fields/Field";
import { ConfirmButton } from "../components/button/ConfirmButton";
import { Email } from "../components/fields/Email";
import { Username } from "../components/fields/Username";
import { Password } from "../components/fields/Password";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Login: React.FC = () => {
    return (
        <div className={`absolute inset-0 flex items-center justify-center`}>
            <div className={`max-w-screen-xsm w-full`}>
                <div className={`bg-white shadow rounded`}>
                    <h1
                        className={`text-xl tracking-wider text-gray-700 px-8 py-6 rounded-t text-center`}
                    >
                        {"Let's get you started"}
                    </h1>
                    <Formik
                        initialValues={{ email: "", username: "", password: "" }}
                        onSubmit={async () => {
                            await sleep(1000);
                            console.log("submit");
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className={`p-8 pt-0`}>
                                <Username className={`mb-4`} />
                                <Email className={`mb-4`} />
                                <Password className={``} />

                                <ConfirmButton
                                    isLoading={isSubmitting}
                                    type={"submit"}
                                    className={`w-full mt-10 text-white font-bold`}
                                >
                                    Register
                                </ConfirmButton>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;
