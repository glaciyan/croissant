import * as React from "react";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";

type Props = {
    nameId: string;
    label?: string;
    placeholder?: string;
};

export const FormTextInput: React.FC<Props> = ({ nameId, label, placeholder }) => {
    return (
        <Field name={nameId}>
            {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                    {label && <FormLabel htmlFor={nameId}>{label}</FormLabel>}
                    <Input {...field} id={nameId} placeholder={placeholder} />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
};
