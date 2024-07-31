import { Meta, StoryObj } from "@storybook/react";
import { Select, SelectProps } from "./Select";

const meta: Meta<SelectProps> = {
  title: "Molecules/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "추가 클래스 이름",
      defaultValue: "",
    },
    options: {
      control: "object",
      description: "드롭다운 옵션 목록",
      defaultValue: ["Option 1", "Option 2", "Option 3"],
    },
    onOptionSelect: { action: "option selected" },
    title: {
      control: "text",
      description: "드롭다운 기본 타이틀",
      defaultValue: "Select an option",
    },
    starshow: {
      control: "boolean",
      description: "레이블 옆 별표 표시 여부",
      defaultValue: true,
    },
    infoText: {
      control: "text",
      description: "정보 텍스트",
      defaultValue: "",
    },
  },
};

export default meta;

type Story = StoryObj<SelectProps>;

export const GenderSelect: Story = {
  args: {
    className: "custom-class",
    options: ["Male", "Female"],
    title: "Select Gender",
    starshow: true,
    infoText: "Please select your gender",
  },
};

export const YearSelect: Story = {
  args: {
    className: "custom-class",
    options: Array.from({ length: 100 }, (_, i) => 2024 - i),
    title: "Select Year",
    starshow: true,
    infoText: "Please select your birth year",
  },
};
