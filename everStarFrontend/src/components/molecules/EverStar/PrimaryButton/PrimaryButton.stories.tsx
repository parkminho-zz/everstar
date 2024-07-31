import type { Meta, StoryObj } from "@storybook/react";
import { PrimaryButton } from "./PrimaryButton";
import { ArrowIcon } from "components/atoms/icons/Arrow/ArrowIcon";
import { LogoIcons } from "components/atoms/symbols/Logo/LogoIcons";

const iconOptions = {
  None: null,
  ArrowIcon: <ArrowIcon color="black" direction="right" size={24} />,
  SmallStarImg: <LogoIcons variant="small-star-img" />,
  SmallEarthImg: <LogoIcons variant="small-earth-img" />,
};

const meta: Meta<typeof PrimaryButton> = {
  title: "Molecules/EverStar/PrimaryButton",
  component: PrimaryButton,
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: { type: "radio", options: ["focus", "hover", "white"] },
      description: "버튼의 테마를 설정합니다.",
    },
    size: {
      control: { type: "radio", options: ["large", "medium", "small"] },
      description: "버튼의 크기를 설정합니다.",
    },
    disabled: {
      control: "boolean",
      description: "버튼의 비활성화 상태를 설정합니다.",
    },
    children: {
      control: "text",
      description: "버튼의 텍스트를 설정합니다.",
    },
    icon: {
      control: "select",
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: "버튼의 아이콘을 설정합니다.",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof PrimaryButton>;

export const WithSmallEarthImg: Story = {
  args: {
    theme: "white",
    size: "large",
    disabled: false,
    children: "지구별로 가기",
    icon: "SmallEarthImg",
  },
};

export const Default: Story = {
  args: {
    theme: "white",
    size: "large",
    disabled: false,
    children: "지구별로 가기",
    icon: "ArrowIcon",
  },
};

export const WithSmallStarImg: Story = {
  args: {
    theme: "white",
    size: "large",
    disabled: false,
    children: "지구별로 가기",
    icon: "SmallStarImg",
  },
};
