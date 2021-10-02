import * as React from "react";
import { GeneralizedInputProps } from "../../types/input";
import { GeneralInput } from "./GeneralInput";

export const UsernameInput: React.FC<GeneralizedInputProps> = ({ label, ...rest }) => {
    return (
        <GeneralInput
            nameId={"username"}
            descriptor={"Username"}
            showLabel={label}
            {...rest}
        />
    );
};
