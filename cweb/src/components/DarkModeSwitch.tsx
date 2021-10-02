import { Switch, useColorMode } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";
    return <Switch mr={4} color="green" isChecked={isDark} onChange={toggleColorMode} />;
};
