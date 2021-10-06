import * as React from "react";
import {
    Checkbox,
    CheckboxProps,
    Flex,
    FormControl,
    FormControlProps,
    FormLabel,
} from "@chakra-ui/react";
import { Field } from "formik";

type Props = {
    nameId: string;
    label: string;
    checkBoxProps?: CheckboxProps;
} & FormControlProps;

export const FormCheckbox: React.FC<Props> = ({
    nameId,
    label,
    checkBoxProps,
    ...rest
}) => {
    return (
        <Field name={nameId}>
            {({ field }) => (
                <FormControl {...rest}>
                    <Flex align={"center"}>
                        <Checkbox {...field} {...checkBoxProps} id={nameId} />
                        <FormLabel htmlFor={nameId} m={0} ml={2}>
                            {label}
                        </FormLabel>
                    </Flex>
                </FormControl>
            )}
        </Field>
    );
};
