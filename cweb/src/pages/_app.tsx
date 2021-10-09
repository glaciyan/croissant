import { ChakraProvider } from "@chakra-ui/react";

import theme from "../configuration/theme";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "tailwindcss/tailwind.css";
import React from "react";
import { UserManager } from "../components/UserManager";

function Croissant({ Component, pageProps }: AppProps) {
    // @ts-ignore
    let layout: any = Component.layout;
    if (layout === undefined) layout = Layout;

    return (
        <UserManager>
            <ChakraProvider resetCSS theme={theme}>
                {layout !== null ? (
                    React.createElement(layout, null, <Component {...pageProps} />)
                ) : (
                    <Component {...pageProps} />
                )}
            </ChakraProvider>
        </UserManager>
    );
}

export default Croissant;
