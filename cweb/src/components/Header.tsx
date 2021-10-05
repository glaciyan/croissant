import { Container } from "@chakra-ui/layout";
import { Box, Button, ButtonGroup, Flex, Spacer, Text } from "@chakra-ui/react";
import navigation from "../configuration/navigation";
import { NavLink } from "./NavLink";
import React from "react";
import NextLink from "next/link";
import { DarkModeSwitch } from "./DarkModeSwitch";
import useSWR from "swr";
import { UserDto } from "../types/dto/userDto";
import { useApi } from "../lib/useApi";

export const Header: React.FC = ({}) => {
    const client = useApi();
    const { data, error } = useSWR<UserDto>("api/users/me", client().fetcher());

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
                    <Text mr={4}>{data?.username ?? "no user"}</Text>
                    <DarkModeSwitch />
                    <ButtonGroup spacing={4}>
                        <NextLink href={"/signup"}>
                            <Button variant={"outline"}>Sign up</Button>
                        </NextLink>
                        <NextLink href={"/login"}>
                            <Button variant={"ghost"}>Login</Button>
                        </NextLink>
                    </ButtonGroup>
                </Flex>
            </Container>
        </Box>
    );
};
