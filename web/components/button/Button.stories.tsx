import React from "react";
import { Story, Meta } from "@storybook/react";

import { ButtonBase, ButtonProps } from "./ButtonBase";
import { ConfirmButton } from "./ConfirmButton";

export default {
    title: "Components/Button",
    component: ButtonBase,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
    <ButtonBase isLoading spinnerLeft className={`bg-red-400 text-light-400`}>
        Click me
    </ButtonBase>
);

export const Default = Template.bind({});
Default.args = {};

const LoadingTemplate: Story<ButtonProps> = (args) => (
    <ButtonBase isLoading={true} className={`bg-red-400 text-light-400`}>
        Click me
    </ButtonBase>
);

export const Loading = LoadingTemplate.bind({});
Default.args = {};

const ConfirmButtonTemplate: Story<ButtonProps> = (args) => (
    <ConfirmButton>Confirm</ConfirmButton>
);

export const Confirm = ConfirmButtonTemplate.bind({});
Default.args = {};

export const WideButton: Story = ((args: any) => (
    <div className={`w-[600px] bg-light-800 rounded p-3`}>
        <ConfirmButton className={`w-full`}>Confirm</ConfirmButton>
    </div>
)).bind({});
