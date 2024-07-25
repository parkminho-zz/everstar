import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CircleButton from './CircleButton';

const meta = {
  title: 'Atoms/Buttons/CircleButton',
  component: CircleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['focus', 'hover', 'white'],
      },
      description: '버튼 테마',
      defaultValue: 'white',
    },
    icon: {
      control: {
        type: 'select',
        options: ['mic', 'phone', 'phoneStrop', 'video', 'settings', 'chat', 'share'],
      },
      description: '아이콘',
      defaultValue: 'mic',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      defaultValue: true,
    },
    onClick: { action: 'clicked', description: '버튼 클릭 이벤트' },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof CircleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Focus: Story = {
  args: {
    theme: 'focus',
    disabled: false,
    icon: 'mic',
  },
};

export const Hover: Story = {
  args: {
    theme: 'hover',
    disabled: false,
    icon: 'mic',
  },
};

export const White: Story = {
  args: {
    theme: 'white',
    disabled: false,
    icon: 'mic',
  },
};

export const Disabled: Story = {
  args: {
    theme: 'white',
    disabled: true,
    icon: 'mic',
  },
};
