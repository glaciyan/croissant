import { Box, Text } from "@chakra-ui/react";
import React from "react";

export function Footer() {
    return (
        <Box as={"footer"}>
            <hr className={`mt-8`} />
            <Text>Footer</Text>
        </Box>
    );
}
