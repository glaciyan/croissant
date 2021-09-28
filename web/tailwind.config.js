module.exports = {
    mode: "jit",
    purge: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            screens: {
                xsm: "450px",
            },
        },

        borderRadius: {
            none: "0px",
            sm: "0.125rem",
            DEFAULT: "6px",
            md: "0.375rem",
            lg: "0.5rem",
            xl: "0.75rem",
            "2xl": "1rem",
            "3xl": "1.5rem",
            full: "9999px",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("tailwindcss-question-mark"),
        require("@tailwindcss/forms")({
            strategy: "class",
        }),
    ],
};
