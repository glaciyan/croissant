import * as React from "react";
import { InputHTMLAttributes } from "react";
import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormLabel,
    Input,
    InputProps,
    useColorModeValue,
} from "@chakra-ui/react";
import { useField } from "formik";

export type FormTextInputProps = InputHTMLAttributes<HTMLInputElement> &
    InputProps & {
        name: string;
        label?: string;
        fc?: FormControlProps;
    };

export const FormTextInput: React.FC<FormTextInputProps> = ({ label, ...props }) => {
    const colorModeVariant = useColorModeValue("outline", "filled");
    const [field, { error }] = useField(props);

    return (
        <FormControl isInvalid={!!error}>
            {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
            <Input {...field} {...props} id={field.name} variant={colorModeVariant} />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};
