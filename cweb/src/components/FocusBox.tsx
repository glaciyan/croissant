import * as React from "react";
import { Center, Flex, useColorModeValue } from "@chakra-ui/react";

export const FocusBox: React.FC = ({ children }) => {
    const backgroundColor = useColorModeValue([null, "gray.100"], "gray.700");
    return (
        <Center minH={"100vh"}>
            <Flex
                direction={"column"}
                maxW={[null, "sm"]}
                w={["100%", null]}
                background={backgroundColor}
                px={{ base: 2, sm: 6 }}
                py={6}
                rounded={"lg"}
            >
                {children}
            </Flex>
        </Center>
    );
};
