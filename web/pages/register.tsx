import { Field, Form, Formik } from "formik";
import React from "react";

const Login: React.FC = () => {
    return (
        <div className={`w-max p-6 mx-auto bg-light-400 shadow`}>
            <div>
                <Formik
                    initialValues={{ email: "", username: "", password: "" }}
                    onSubmit={async () => console.log("submitted")}
                >
                    <Form>
                        <Field
                            type="email"
                            name="email"
                            className={`focus:outline-none focus:ring-2 ring-inset ring-blue-400/60 transition-shadow`}
                        />
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
