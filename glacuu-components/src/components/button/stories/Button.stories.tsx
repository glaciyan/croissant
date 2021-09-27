import { Story } from "@storybook/react";

import { Button, ButtonProps } from "../src/Button";

export default {
    title: "Button",
    component: Button,
};

const Template: Story<ButtonProps> = (args) => <Button {...args}>Click me</Button>;

export const Default = Template.bind({});
