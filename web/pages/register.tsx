import { Form, Formik } from "formik";
import React from "react";
import { CField } from "../components/Field";
import { ConfirmButton } from "../components/button/ConfirmButton";

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
                                <CField
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    className={`rounded mb-4`}
                                />
                                <CField
                                    name="username"
                                    placeholder="Username"
                                    type="username"
                                    className={`rounded mb-4`}
                                />
                                <CField
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    className={`rounded`}
                                />
                                <ConfirmButton
                                    isLoading={isSubmitting}
                                    type={"submit"}
                                    className={`w-full mt-10 text-white`}
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
