import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, type ButtonProps } from "./button";

const sizes: ButtonProps["size"][] = ["default", "lg", "sm"];
const variants: ButtonProps["variant"][] = ["primary", "secondary"];

const meta: Meta<typeof Button> = {
  args: { children: "Button" },
  argTypes: {
    disabled: { control: { type: "boolean" } },
    size: { control: { type: "select" }, options: sizes },
    variant: { control: { type: "select" }, options: variants },
  },
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/UI/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: (props) => {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {variants.map((variant) => {
          return (
            <div className="flex flex-col gap-4" key={variant}>
              <h2 className="text-lg font-bold capitalize">{variant}</h2>

              {sizes.map((size) => {
                return (
                  <div className="grid grid-cols-2 gap-2" key={size}>
                    <div className="flex items-center gap-2">
                      <p className="font-medium uppercase">{size}</p>

                      <Button {...props} size={size} variant={variant} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (props) => {
    return (
      <div className="grid grid-cols-3 gap-10">
        {variants.map((variant) => {
          return (
            <div className="flex flex-col gap-4" key={variant}>
              <h2 className="text-lg font-bold capitalize">{variant}</h2>

              {sizes.map((size) => {
                return (
                  <div className="grid grid-cols-2 gap-4" key={size}>
                    <div className="flex items-center gap-2">
                      <p className="font-medium uppercase">{size}</p>

                      <Button {...props} size={size} variant={variant} disabled />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },
};

export const Default: Story = {};
