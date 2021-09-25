import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { MediumPage } from "../components/MediumPage";

const login: React.FC = () => {
    const [response, setresponse] = useState("");
    return (
        <Layout currentPageName="Login" title="Login">
            <MediumPage>
                <h1>Login</h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={async (values) => {
                        var response = await axios.post(
                            "https://localhost:5001/api/auth/login",
                            values,
                            {
                                withCredentials: true,
                            }
                        );

                        setresponse("Access token: " + response.data.token);
                    }}
                >
                    <Form className={`text-black`}>
                        <Field id="email" name="email" placeholder="Email" />
                        <Field id="password" name="password" placeholder="Password" />
                        <button
                            className={`bg-gscale-dark-background-secondary text-gscale-dark-text-secondary px-4 py-2 rounded`}
                            type="submit"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>
                <p className={`w-60 break-all`}>{response}</p>
            </MediumPage>
        </Layout>
    );
};

export default login;
