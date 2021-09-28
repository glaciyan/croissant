import React from "react";
import { ClassName } from "../../contracts/ClassName";
import { CField } from "./Field";

export const Email: React.FC<ClassName> = ({ className }: ClassName) => {
    return (
        <CField
            className={className}
            name="email"
            placeholder="Email"
            spellCheck={false}
            type="email"
        />
    );
};
