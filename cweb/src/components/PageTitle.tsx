import * as React from "react";
import Head from "next/head";

export const PageTitle: React.FC = ({ children }) => {
    return (
        <Head>
            <title>{children} - Croissant</title>
        </Head>
    );
};
