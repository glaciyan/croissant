import React, { ButtonHTMLAttributes } from "react";

export type ButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <button
            {...rest}
            className={`bg-red-400 hover:bg-red-400/80 active:bg-red-400/60 dark:bg-blue-400 py-2 px-4 text-white rounded shadow transition-colors ${
                rest.className ?? ""
            }`}
        >
            {children}
        </button>
    );
};
