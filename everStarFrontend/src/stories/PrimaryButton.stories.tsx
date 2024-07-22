import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import PrimaryButton from "./../components/atoms/PrimaryButton";
const meta = {
  title: "Buttons/PrimaryButton",
  component: PrimaryButton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: {
        type: "select",
        options: ["primary", "light", "white"],
      },
      description: "버튼 테마",
      defaultValue: "white",
    },
    size: {
      control: {
        type: "select",
        options: ["large", "midium", "small"],
      },
      description: "버튼 크기",
      defaultValue: "large",
    },
    children: {
      control: "text",
      description: "버튼 text",
      defaultValue: "텍스트 버튼",
    },
    alt: {
      control: "text",
      description: "아이콘 alt",
      defaultValue: "icon",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 여부",
      defaultValue: true,
    },

    onClick: { action: "clicked", description: "버튼 클릭 이벤트" },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "large",
    children: "Button",
    theme: "primary",
    disabled: false,
    alt: "icon",
  },
};

export const Light: Story = {
  args: {
    size: "large",
    children: "Button",
    theme: "light",
    disabled: false,
    alt: "icon",
  },
};

export const White: Story = {
  args: {
    size: "large",
    children: "Button",
    theme: "white",
    disabled: false,
    alt: "icon",
  },
};

export const Disabled: Story = {
  args: {
    size: "large",
    children: "Button",
    theme: "white",
    disabled: true,
    alt: "icon",
  },
};
