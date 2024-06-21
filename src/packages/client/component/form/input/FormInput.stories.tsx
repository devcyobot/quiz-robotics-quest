import type { Meta, StoryObj } from "@storybook/react";
import FormInput from "./FormInput";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Form/Input",
  component: FormInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    typeInput: {
      options: ["email", "password"],
      control: { type: "radio" },
    },
    name: {
      options: ["email", "password"],
      control: { type: "radio" },
    },
    placeHolder: { control: "text" },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Email: Story = {
  args: {
    typeInput: "email",
    name: "email",
    placeHolder: "Email",
  },
};

export const Password: Story = {
  args: {
    typeInput: "password",
    name: "password",
    placeHolder: "Password",
  },
};

export const ConfirmPassword: Story = {
  args: {
    typeInput: "password",
    name: "confirmPasword",
    placeHolder: "Confirm Password",
  },
};
