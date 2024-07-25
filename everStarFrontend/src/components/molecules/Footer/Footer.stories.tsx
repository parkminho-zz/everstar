import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Molecules/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio', options: ['desktop', 'tablet', 'mobile'] },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Desktop: Story = {
  args: {
    type: 'desktop',
  },
};

export const Tablet: Story = {
  args: {
    type: 'tablet',
  },
};

export const Mobile: Story = {
  args: {
    type: 'mobile',
  },
};
