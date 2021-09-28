import React from "react";
import { ClassName } from "../../contracts/ClassName";
import { CField } from "./Field";

export const Username: React.FC<ClassName> = ({ className }: ClassName) => {
    return (
        <CField
            autoFocus={true}
            className={className}
            name="username"
            placeholder="Username"
            type="username"
        />
    );
};
