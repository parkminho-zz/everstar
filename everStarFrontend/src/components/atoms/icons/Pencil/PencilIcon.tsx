import React from 'react';
import { ReactComponent as PencilIconSVG } from 'assets/icons/pencil.svg';

interface PencilIconProps {
  size: 16 | 24;
  color?: 'black' | 'gray' | 'white' | 'orange';
  onClick?: () => void; // onClick 속성 추가
}

export const PencilIcon: React.FC<PencilIconProps> = ({
  size,
  color = 'black',
  onClick, // onClick 속성 추가
}) => {
  const sizeClasses = size === 16 ? 'w-4 h-4' : 'w-6 h-6';
  const colorClasses = {
    black: 'text-greyscaleblack-100',
    gray: 'text-greyscaleblack-60',
    white: 'text-greyscalewhite',
    orange: 'text-mainprimary',
  };

  return (
    <PencilIconSVG
      className={`${sizeClasses} ${colorClasses[color]}`}
      onClick={onClick} // onClick 핸들러 추가
    />
  );
};

export type { PencilIconProps };
