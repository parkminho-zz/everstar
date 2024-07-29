import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export interface EmotionPageProps {
  data: number[];
}

export const EmotionPage: React.FC<EmotionPageProps> = ({ data }) => {
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: '감정 일조량',
        data: data,
        backgroundColor: 'rgba(255, 237, 101, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};
