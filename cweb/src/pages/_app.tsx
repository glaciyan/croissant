import { ChakraProvider } from "@chakra-ui/react";

import theme from "../configuration/theme";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "tailwindcss/tailwind.css";
import React from "react";
import { TokenProvider } from "../components/Token";

function MyApp({ Component, pageProps }: AppProps) {
    // @ts-ignore
    let layout: any = Component.layout;
    if (layout === undefined) layout = Layout;

    return (
        <TokenProvider>
            <ChakraProvider resetCSS theme={theme}>
                {layout !== null ? (
                    React.createElement(layout, null, <Component {...pageProps} />)
                ) : (
                    <Component {...pageProps} />
                )}
            </ChakraProvider>
        </TokenProvider>
    );
}

export default MyApp;
