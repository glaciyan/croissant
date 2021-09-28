import { Field } from "formik";
import React, { InputHTMLAttributes } from "react";
import { ClassName } from "../../contracts/ClassName";
import cn from "classnames";

export type FieldProps = {
    name: string;
} & InputHTMLAttributes<HTMLInputElement> &
    ClassName;

export const CField: React.FC<FieldProps> = ({ name, className, ...rest }) => {
    return (
        <Field
            className={cn(
                "form-focus rounded transition-shadow py-3 px-4 bg-gray-100 block w-full",
                className
            )}
            id={name}
            name={name}
            {...rest}
        />
    );
};
