import type { Meta, StoryObj } from '@storybook/react';
import { Question } from './Question';

const meta: Meta<typeof Question> = {
  title: 'Molecules/MemorialBook/Question',
  component: Question,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Question component for MemorialBook.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Question>;

export const Default: Story = {
  args: {
    title: '소중했던 추억회상',
    description: 'Q.친구와 함께하며 가장 행복했던 순간이 언제였나요?',
  },
};
