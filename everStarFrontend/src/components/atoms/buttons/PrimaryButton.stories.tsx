import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import PrimaryButton from './PrimaryButton';
const meta = {
  title: 'Atoms/Buttons/PrimaryButton',
  component: PrimaryButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
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
    size: {
      control: {
        type: 'select',
        options: ['large', 'midium', 'small'],
      },
      description: '버튼 크기',
      defaultValue: 'large',
    },
    children: {
      control: 'text',
      description: '버튼 text',
      defaultValue: '텍스트 버튼',
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
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Focus: Story = {
  args: {
    size: 'large',
    children: 'Button',
    theme: 'focus',
    disabled: false,
  },
};

export const Hover: Story = {
  args: {
    size: 'large',
    children: 'Button',
    theme: 'hover',
    disabled: false,
  },
};

export const White: Story = {
  args: {
    size: 'large',
    children: 'Button',
    theme: 'white',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    size: 'large',
    children: 'Button',
    theme: 'white',
    disabled: true,
  },
};
