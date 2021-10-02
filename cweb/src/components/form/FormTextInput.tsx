import * as React from "react";
import { InputHTMLAttributes } from "react";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputProps,
} from "@chakra-ui/react";
import { Field } from "formik";

export type FormTextInputProps = {
    nameId: string;
    id?: string;
    label?: string;
    placeholder?: string;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
} & InputProps;

export const FormTextInput: React.FC<FormTextInputProps> = ({
    nameId,
    id,
    label,
    placeholder,
    inputProps,
    ...rest
}) => {
    return (
        <Field name={nameId}>
            {({ field, form }) => (
                <FormControl {...rest} isInvalid={form.errors.name && form.touched.name}>
                    {label && <FormLabel htmlFor={nameId}>{label}</FormLabel>}
                    <Input
                        {...field}
                        {...inputProps}
                        id={id ? id : nameId}
                        placeholder={placeholder}
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
};
