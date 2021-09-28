import { Field } from "formik";
import React from "react";
import { ClassName } from "../../contracts/ClassName";
import cn from "classnames";

export const Password: React.FC<ClassName> = ({ className }: ClassName) => {
    return (
        <div>
            <Field
                className={cn("nol", className)}
                name="password"
                placeholder="Password"
                type="password"
            />
        </div>
    );
};
