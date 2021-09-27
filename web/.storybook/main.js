const WindiCSS = require("windicss-webpack-plugin").default;

module.exports = {
    stories: [
        "../components/**/*.stories.mdx",
        "../components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    webpackFinal: (config) => {
        config.plugins.push(new WindiCSS());
        return config;
    },
};
