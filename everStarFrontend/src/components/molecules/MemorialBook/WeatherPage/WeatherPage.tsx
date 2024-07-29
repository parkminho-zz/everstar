import React from 'react';
import { WeatherIcon, WeatherIconProps } from 'components/atoms/icons/weather/WeatherIcon';

export interface WeatherPageProps {
  weatherScores: number[];
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

export const WeatherPage: React.FC<WeatherPageProps> = ({ weatherScores }) => {
  return (
    <div className="flex justify-around items-center h-full">
      {weatherScores.map((score, index) => (
        <div key={index} className="flex flex-col items-center">
          <WeatherIcon type={getWeatherType(score)} />
          <p className="text-center">{`Day ${index + 1}`}</p>
        </div>
      ))}
    </div>
  );
};
