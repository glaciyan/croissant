import React, { ReactNode } from "react";

export type MediumPageProps = {
    children: ReactNode;
};

export const MediumPage: React.FC<MediumPageProps> = ({ children }) => (
    <div className="max-w-screen-xl mx-5 xl:mx-auto">{children}</div>
);
