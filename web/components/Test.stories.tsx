import React from "react";
import { Story, Meta } from "@storybook/react";

import { Test, TestProps } from "./Test";

export default {
    title: "Components/Test",
    component: Test,
} as Meta;

const Template: Story<TestProps> = (args) => <Test {...args} />;

export const Default = Template.bind({});
Default.args = {};
