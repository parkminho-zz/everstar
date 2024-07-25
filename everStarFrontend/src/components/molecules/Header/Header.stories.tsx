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
        options: [
          'earth',
          'tablet-earth',
          'mobile-earth',
          'everstar',
          'tablet-everstar',
          'mobile-everstar',
          'mypage',
          'tablet-mypage',
          'mobile-mypage',
        ],
      },
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    type: 'tablet-earth',
    className: '',
  },
};

export const TabletEarth: Story = {
  args: {
    type: 'tablet-earth',
    className: '',
  },
};

export const MobileEarth: Story = {
  args: {
    type: 'mobile-earth',
    className: '',
  },
};

export const Everstar: Story = {
  args: {
    type: 'everstar',
    className: '',
  },
};

export const TabletEverstar: Story = {
  args: {
    type: 'tablet-everstar',
    className: '',
  },
};

export const MobileEverstar: Story = {
  args: {
    type: 'mobile-everstar',
    className: '',
  },
};

export const Mypage: Story = {
  args: {
    type: 'mypage',
    className: '',
  },
};

export const TabletMypage: Story = {
  args: {
    type: 'tablet-mypage',
    className: '',
  },
};

export const MobileMypage: Story = {
  args: {
    type: 'mobile-mypage',
    className: '',
  },
};
