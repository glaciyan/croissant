import React, { ReactNode } from "react";

export type LayoutProps = {};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <div>{children}</div>;
};
