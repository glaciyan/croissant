import * as React from "react";
import { GeneralizedInputProps } from "../../types/input";
import { GeneralInput } from "./GeneralInput";

export const EmailInput: React.FC<GeneralizedInputProps> = ({ label, ...rest }) => {
    return (
        <GeneralInput
            nameId={"email"}
            descriptor={"Email"}
            showLabel={label}
            inputProps={{ type: "email" }}
            {...rest}
        />
    );
};
