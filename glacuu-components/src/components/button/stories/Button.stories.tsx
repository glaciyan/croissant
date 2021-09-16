import React from "react";
import { Story, Meta } from "@storybook/react";

import { Button, ButtonProps } from "../src/Button";

export default {
    title: "Button",
    component: Button,
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = { text: "Click this button" };

export const Other = Template.bind({});
Other.args = { text: "This is another button" };
