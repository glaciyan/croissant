import {Container} from "@chakra-ui/layout";
import React from "react";

export const Layout: React.FC = ({children}) => {
    return (
        <Container as="main" maxW="container.lg">
            {children}
        </Container>
    );
};
