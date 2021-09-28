import React from "react";

export type ButtonProps = {};

export const Button: React.FC<ButtonProps> = ({ children }) => {
    return <button>{children}</button>;
};
