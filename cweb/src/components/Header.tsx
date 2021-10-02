import { Container } from "@chakra-ui/layout";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import navigation from "../configuration/navigation";
import { NavLink } from "./NavLink";
import React from "react";
import NextLink from "next/link";

export function Header() {
    return (
        <Box as={"header"}>
            <Container maxW={"container.xl"} py={6}>
                <Flex align={"baseline"}>
                    <Text mr={8}>Croissant</Text>
                    <Flex as={"nav"} align={"baseline"} flex={"1"}>
                        {navigation.map((i, index, array) => {
                            return (
                                <NavLink
                                    key={i.href}
                                    href={i.href}
                                    rightLine={index < array.length - 1}
                                >
                                    {i.name}
                                </NavLink>
                            );
                        })}
                    </Flex>
                    <NextLink href={"/signup"}>
                        <Button variant={"outline"} mr={4}>
                            Sign up
                        </Button>
                    </NextLink>
                    <NextLink href={"/login"}>
                        <Button variant={"ghost"}>Login</Button>
                    </NextLink>
                </Flex>
            </Container>
        </Box>
    );
}
