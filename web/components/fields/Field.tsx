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
                "form-input border-none form-focus rounded transition-shadow py-2 px-3 bg-gray-100 placeholder-gray-400 block w-full",
                className
            )}
            id={name}
            name={name}
            {...rest}
        />
    );
};
