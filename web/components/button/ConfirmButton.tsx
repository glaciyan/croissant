import React from "react";
import { ButtonBase, ButtonProps } from "./ButtonBase";

export const ConfirmButton: React.FC<ButtonProps> = ({ className, ...rest }) => {
    return (
        <ButtonBase
            className={`bg-blue-400 text-light-400 ` + className}
            {...rest}
        ></ButtonBase>
    );
};
