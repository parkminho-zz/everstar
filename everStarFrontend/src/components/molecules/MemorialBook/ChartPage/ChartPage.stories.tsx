import type { Meta, StoryObj } from '@storybook/react';
import { ChartPage } from './ChartPage';

const meta: Meta<typeof ChartPage> = {
  title: 'Molecules/MemorialBook/ChartPage',
  component: ChartPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ChartPage>;

export const Default: Story = {
  args: {
    title: '평가 결과',
    content: '굉장히 많이 호전되었어요.',
    scores: [10, 30, 50, 70, 90, 60, 40],
  },
};
