import {Container} from "@chakra-ui/layout";
import {Box, Flex, Text} from "@chakra-ui/react";
import navigation from "../navigation";
import {NavLink} from "./NavLink";
import React from "react";

export function Header() {
    return <Box as={"header"}>
        <Container maxW={"container.xl"} py={6}>
            <Flex>
                <Text mr={8}>Croissant</Text>
                <Flex as={"nav"} align={"center"}>
                    {navigation.map((i, index, array) => {
                        return <NavLink key={i.href} href={i.href}
                                        rightLine={index < array.length - 1}>{i.name}</NavLink>;
                    })}
                </Flex>
            </Flex>
        </Container>
    </Box>;
}