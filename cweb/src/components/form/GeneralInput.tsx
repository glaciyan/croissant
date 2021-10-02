import * as React from "react";
import { FormTextInput, FormTextInputProps } from "./FormTextInput";

export type GeneralInputProps = FormTextInputProps & {
    descriptor: string;
    showLabel?: boolean;
};

export const GeneralInput: React.FC<GeneralInputProps> = ({
    showLabel = false,
    descriptor,
    ...rest
}) => {
    return (
        <FormTextInput
            placeholder={!showLabel ? descriptor : undefined}
            label={showLabel ? descriptor : undefined}
            {...rest}
        />
    );
};
