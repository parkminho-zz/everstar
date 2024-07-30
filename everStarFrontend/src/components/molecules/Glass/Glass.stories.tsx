import { Meta, StoryObj } from '@storybook/react';
import { Glass } from './Glass';

const meta: Meta<typeof Glass> = {
  title: 'Atoms/Glass',
  component: Glass,
  argTypes: {
    variant: {
      control: { type: 'radio', options: ['desktop', 'tablet', 'mobile'] },
      description: 'Variant of the Glass component to display',
    },
    currentPage: {
      control: 'number',
      description: 'Current page number',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    onPageChange: { action: 'page changed' },
    showPageIndicator: {
      control: 'boolean',
      description: 'Show or hide the PageIndicator',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Glass>;

export const Desktop: Story = {
  args: {
    variant: 'desktop',
    currentPage: 1,
    totalPages: 3,
    showPageIndicator: true,
  },
};

export const Tablet: Story = {
  args: {
    variant: 'tablet',
    currentPage: 1,
    totalPages: 3,
    showPageIndicator: true,
  },
};

export const Mobile: Story = {
  args: {
    variant: 'mobile',
    currentPage: 1,
    totalPages: 3,
    showPageIndicator: true,
  },
};
