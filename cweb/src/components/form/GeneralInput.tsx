import * as React from "react";
import { FormTextInput, FormTextInputProps } from "./FormTextInput";

export type GeneralInputProps = FormTextInputProps & {
    descriptor: string;
    showLabel: boolean;
};

export const GeneralInput: React.FC<GeneralInputProps> = ({
    showLabel,
    descriptor,
    ...rest
}) => {
    return (
        <FormTextInput
            placeholder={!showLabel && descriptor}
            label={showLabel && descriptor}
            {...rest}
        />
    );
};
