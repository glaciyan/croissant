import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
    "2xl": "96em",
});

const colors = {
    black: "#16161D",
};

const config: ThemeConfig = {
    initialColorMode: "dark",
};

const theme = extendTheme({
    colors,
    fonts,
    breakpoints,
    config,
});

export default theme;
