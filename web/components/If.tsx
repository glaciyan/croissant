import React, { ReactNode } from "react";

export type IfProps = {
    condition?: boolean;
    _else?: ReactNode;
};

export const If: React.FC<IfProps> = ({ children, condition, _else = null }) => {
    return condition ? <>{children}</> : <>{_else}</>;
};
