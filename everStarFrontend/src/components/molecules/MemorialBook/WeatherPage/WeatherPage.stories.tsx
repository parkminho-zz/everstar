import type { Meta, StoryObj } from '@storybook/react';
import { WeatherPage } from './WeatherPage';

const meta: Meta<typeof WeatherPage> = {
  title: 'Molecules/MemorialBook/WeatherPage',
  component: WeatherPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WeatherPage>;

export const Default: Story = {
  args: {
    weatherScores: [10, 30, 50, 70, 90, 60, 40],
  },
};
