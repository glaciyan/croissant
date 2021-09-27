module.exports = {
    mode: "jit",
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gscale: {
                    dark: {
                        background: {
                            ternary: "#18191B",
                            ternary500: "#1d1e20",
                            secondary: "#252527",
                            500: "#373739",
                            primary: "#2F3033",
                        },
                        text: {
                            ternary: "#8A8C8F",
                            secondary: "#C9CBCF",
                            primary: "#F4F4F4",
                        },
                    },
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
