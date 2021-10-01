import React from "react";
import {Box} from "@chakra-ui/react";
import {Header} from "./Header";
import {Footer} from "./Footer";

export const Layout: React.FC = ({children}) => {
    return (
        <>
            <Header/>
            <Box as="main">{children}</Box>
            <Footer/>
        </>
    );
};
