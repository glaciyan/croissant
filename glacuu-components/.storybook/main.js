module.exports = {
    stories: [
        "../src/components/**/*.stories.mdx",
        "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        {
            name: "@storybook/addon-postcss",
            options: {
                postcssLoaderOptions: {
                    implementation: require("postcss"),
                },
            },
        },
        "../addons/theme-toggle/preset.js",
        "@storybook/addon-a11y",
    ],
};
