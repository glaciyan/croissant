import { ChakraProvider } from "@chakra-ui/react";

import theme from "../configuration/theme";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
