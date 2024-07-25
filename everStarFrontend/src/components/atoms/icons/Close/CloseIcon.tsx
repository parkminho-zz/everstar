import React from 'react';
import { ReactComponent as CloseIconSVG } from 'assets/icons/close.svg';

interface CloseIconProps {
  size: 16 | 24;
  color?: 'black' | 'gray' | 'white' | 'orange';
}

const CloseIcon: React.FC<CloseIconProps> = ({ size, color = 'black' }) => {
  const sizeClasses = size === 16 ? 'w-4 h-4' : 'w-6 h-6';
  const colorClasses = {
    black: 'text-greyscaleblack-100',
    gray: 'text-greyscaleblack-60',
    white: 'text-greyscalewhite',
    orange: 'text-mainprimary',
  };

  return <CloseIconSVG className={`${sizeClasses} ${colorClasses[color]}`} />;
};

export default CloseIcon;
export type { CloseIconProps };
