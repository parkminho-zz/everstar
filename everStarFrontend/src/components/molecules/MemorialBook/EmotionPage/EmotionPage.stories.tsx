import type { Meta, StoryObj } from '@storybook/react';
import { EmotionPage } from './EmotionPage';

const meta: Meta<typeof EmotionPage> = {
  title: 'Molecules/MemorialBook/EmotionPage',
  component: EmotionPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EmotionPage>;

export const Default: Story = {
  args: {
    data: [20, 40, 60, 80, 100, 60, 40],
  },
};
