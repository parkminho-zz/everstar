import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export interface EmotionPageProps {
  data: number[];
}

export const EmotionPage: React.FC<EmotionPageProps> = ({ data }) => {
  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Emotion Intensity',
        data: data,
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};
