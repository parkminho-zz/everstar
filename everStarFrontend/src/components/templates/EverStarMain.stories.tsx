import type { Meta, StoryObj } from "@storybook/react";
import { EverStarMain } from "./EverStarMain";

const meta: Meta<typeof EverStarMain> = {
  title: "Templates/EverStarMain",
  component: EverStarMain,
  parameters: {
    viewport: {
      viewports: {
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "800px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "667px" },
        },
      },
      defaultViewport: "desktop",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EverStarMain>;

export const Default: Story = {
  args: {
    title: "뚜뚜",
    fill: 0,
    buttonTheme: "white",
    buttonSize: "large",
    buttonDisabled: false,
    buttonText: "지구별로 가기",
    onButtonClick: () => alert("Button Clicked"),
  },
};
