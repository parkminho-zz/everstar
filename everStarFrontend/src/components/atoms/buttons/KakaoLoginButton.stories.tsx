import type { Meta, StoryObj } from '@storybook/react';
import { KakaoLoginButton } from 'components/atoms/buttons/KakaoLoginButton';

const meta: Meta<typeof KakaoLoginButton> = {
  title: 'Atoms/Buttons/KakaoLoginButton',
  component: KakaoLoginButton,
  argTypes: {
    size: {
      control: { type: 'radio', options: ['large', 'medium'] },
      description: 'The size of the button',
    },
    variant: {
      control: { type: 'radio', options: ['narrow', 'wide'] },
      description: 'The variant of the button',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof KakaoLoginButton>;

export const LargeNarrow: Story = {
  args: {
    size: 'large',
    variant: 'narrow',
  },
};

export const LargeWide: Story = {
  args: {
    size: 'large',
    variant: 'wide',
  },
};

export const MediumNarrow: Story = {
  args: {
    size: 'medium',
    variant: 'narrow',
  },
};

export const MediumWide: Story = {
  args: {
    size: 'medium',
    variant: 'wide',
  },
};
