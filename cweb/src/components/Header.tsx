import { Container } from "@chakra-ui/layout";
import { Box, Button, ButtonGroup, Flex, Spacer, Text } from "@chakra-ui/react";
import navigation from "../configuration/navigation";
import { NavLink } from "./NavLink";
import React from "react";
import NextLink from "next/link";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { User } from "./UserManager";

export function Header() {
    return (
        <Box as={"header"}>
            <Container maxW={"container.xl"} py={6}>
                <Flex align={"baseline"}>
                    <Text mr={8}>Croissant</Text>
                    <Flex as={"nav"} align={"baseline"}>
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
                    <Spacer />
                    <DarkModeSwitch />
                    <User>
                        {({ user }) =>
                            user ? (
                                <ButtonGroup spacing={4}>
                                    <Button variant={"ghost"}>{user.username}</Button>
                                    <NextLink href={"/logout"}>
                                        <Button variant={"outline"}>Logout</Button>
                                    </NextLink>
                                </ButtonGroup>
                            ) : (
                                <ButtonGroup spacing={4}>
                                    <NextLink href={"/login"}>
                                        <Button variant={"ghost"}>Login</Button>
                                    </NextLink>
                                    <NextLink href={"/signup"}>
                                        <Button variant={"outline"}>Sign up</Button>
                                    </NextLink>
                                </ButtonGroup>
                            )
                        }
                    </User>
                </Flex>
            </Container>
        </Box>
    );
}
