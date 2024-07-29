import React from 'react';
import { WeatherIcon, WeatherIconProps } from 'components/atoms/icons/weather/WeatherIcon';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export interface ChartPageProps {
  title: string;
  content: string;
  scores: number[];
}

const getWeatherType = (weatherScore: number): WeatherIconProps['type'] => {
  if (weatherScore <= 20) {
    return 'thunder';
  } else if (weatherScore <= 40) {
    return 'rain';
  } else if (weatherScore <= 60) {
    return 'wind';
  } else if (weatherScore <= 80) {
    return 'cloud';
  } else {
    return 'sun';
  }
};

export const ChartPage: React.FC<ChartPageProps> = ({ title, content, scores }) => {
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: '감정 일조량',
        data: scores,
        backgroundColor: 'rgba(255, 237, 101, 0.6)',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="w-[360px] mx-auto p-4">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{content}</p>
      </div>
      <div className="flex items-center justify-center mb-4">
        {scores.map((score, index) => (
          <div key={index} className="flex flex-col items-center mx-2">
            <WeatherIcon type={getWeatherType(score)} />
            <p className="text-center">{`Week ${index + 1}`}</p>
          </div>
        ))}
      </div>
      <div style={{ width: '360px', height: '270px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
