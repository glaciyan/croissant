import * as React from "react";
import { GeneralizedInputProps } from "../../types/input";
import { GeneralInput } from "./GeneralInput";

export const PasswordInput: React.FC<GeneralizedInputProps> = ({ label, ...rest }) => {
    return (
        <GeneralInput
            nameId={"password"}
            descriptor={"Password"}
            showLabel={label}
            inputProps={{ type: "password" }}
            {...rest}
        />
    );
};
