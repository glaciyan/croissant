import React from "react";

export type CenteredPageProps = {};

export const CenteredPage: React.FC<CenteredPageProps> = ({ children }) => (
    <div className="max-w-screen-xl mx-5 xl:mx-auto">{children}</div>
);
