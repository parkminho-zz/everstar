import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Molecules/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'radio',
        options: ['earth', 'everstar', 'mypage'],
      },
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Earth: Story = {
  args: {
    type: 'earth',
    className: '',
  },
};

export const Everstar: Story = {
  args: {
    type: 'everstar',
    className: '',
  },
};

export const Mypage: Story = {
  args: {
    type: 'mypage',
    className: '',
  },
};
