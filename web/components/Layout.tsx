import React from "react";

export type LayoutProps = {};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <div className={``}>{children}</div>;
};
