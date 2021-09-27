import { defineConfig } from "windicss/helpers";

export default defineConfig({
    extract: {
        include: ["**/*.{tsx,css}"],
        exclude: ["node_modules", ".git", ".next"],
    },

    theme: {
        extend: {
            colors: {
                "custom-color": "#E43F49",
            },
        },
    },

    plugins: [],
});
