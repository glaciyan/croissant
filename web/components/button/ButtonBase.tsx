import React, { ButtonHTMLAttributes } from "react";
import { If } from "../If";
import { CircleSpinner } from "../spinner/CircleSpinner";

export type ButtonProps = {
    isLoading?: boolean;
    spinnerLeft?: boolean;
    spinnerRight?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonBase: React.FC<ButtonProps> = ({
    children,
    className,
    isLoading = false,
    spinnerLeft,
    spinnerRight,
    disabled,
    ...rest
}) => {
    const spinner = <CircleSpinner />;
    return (
        <>
            <button
                disabled={disabled || isLoading}
                className={
                    `flex items-center justify-center px-3 py-1.5 rounded transition-colors focus:(outline-none) hover:(bg-opacity-90) active:(bg-opacity-70) disabled:(bg-opacity-50) ` +
                    className
                }
                {...rest}
            >
                <If condition={isLoading && spinnerLeft}>{spinner}</If>
                <If
                    condition={!isLoading}
                    _else={
                        <If
                            condition={!spinnerLeft && !spinnerRight}
                            _else={<span className={`ml-1`}>{children}</span>}
                        >
                            <CircleSpinner />
                        </If>
                    }
                >
                    {children}
                </If>
                <If condition={isLoading && spinnerRight}>{spinner}</If>
            </button>
        </>
    );
};
