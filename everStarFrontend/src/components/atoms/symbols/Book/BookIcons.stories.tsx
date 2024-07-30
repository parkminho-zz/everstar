import type { Meta, StoryObj } from '@storybook/react';
import { BookIcons } from './BookIcons';

const meta: Meta<typeof BookIcons> = {
  title: 'Atoms/Symbols/BookIcons',
  component: BookIcons,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio', options: ['book-close', 'book-open'] },
    },
    text: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookIcons>;

export const Default: Story = {
  args: {
    variant: 'book-close',
  },
};
