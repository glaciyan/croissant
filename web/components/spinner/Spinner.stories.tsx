import React from "react";
import { Story, Meta } from "@storybook/react";

import { CircleSpinner, CircleSpinnerProps } from "./CircleSpinner";

export default {
    title: "Components/Spinners/CircleSpinner",
    component: CircleSpinner,
} as Meta;

const Template: Story<CircleSpinnerProps> = (args) => <CircleSpinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
