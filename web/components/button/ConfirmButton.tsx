import React from "react";
import { ButtonBase, ButtonProps } from "./ButtonBase";
import cn from "classnames";

export const ConfirmButton: React.FC<ButtonProps> = ({ className, ...rest }) => {
    return (
        <ButtonBase
            className={cn(`bg-blue-400 text-light-400`, className)}
            {...rest}
        ></ButtonBase>
    );
};
