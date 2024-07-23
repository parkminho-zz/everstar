import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Symbols/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio', options: ['small', 'medium', 'large', 'text'] },
    },
    name: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'medium',
    name: '홍길동',
  },
};
