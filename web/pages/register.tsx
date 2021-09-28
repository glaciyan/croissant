import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { CField } from "../components/fields/Field";
import { ConfirmButton } from "../components/button/ConfirmButton";
import { Email } from "../components/fields/Email";
import { Username } from "../components/fields/Username";
import { Password } from "../components/fields/Password";
import * as Yup from "yup";
import { BrandLogo } from "../components/BrandLogo";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Login: React.FC = () => {
    return (
        <div
            className={`absolute inset-0 flex items-center justify-center text-gray-700`}
        >
            <div className={`max-w-screen-xsm w-full`}>
                <div className={`bg-white shadow rounded p-8`}>
                    <div className="flex flex-col items-center">
                        <BrandLogo className={`w-24`} />
                        <h1
                            className={`text-xl tracking-wider px-8 pb-8 pt-4 rounded-t text-center`}
                        >
                            {"Let's get you started"}
                        </h1>
                    </div>
                    <Formik
                        initialValues={{
                            email: "",
                            username: "",
                            password: "",
                            confirmPw: "",
                        }}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validationSchema={Yup.object().shape({
                            password: Yup.string().required("Password is required"),
                            confirmPw: Yup.string()
                                .when("password", {
                                    is: (val: string) =>
                                        val && val.length > 0 ? true : false,
                                    then: Yup.string().oneOf(
                                        [Yup.ref("password")],
                                        "Password does not match"
                                    ),
                                })
                                .required("Confirm your password"),
                            username: Yup.string().required("Username is required"),
                            email: Yup.string()
                                .email("Email address is required")
                                .required("Email address is required"),
                        })}
                        onSubmit={async () => {
                            await sleep(1000);
                            console.log("submit");
                        }}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form className={``}>
                                <Username className={`mb-6`} />
                                <Email className={`mb-6`} />
                                <Password />

                                {/* TODO make errors for each element */}
                                <div>
                                    {errors.confirmPw}
                                    {errors.password}
                                    {errors.email}
                                    {errors.username}
                                </div>
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
