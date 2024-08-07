// src/components/organics/ProgressCard/ProgressCard.tsx
import React from 'react';
import { CurrentLocation } from 'components/molecules/EverStar/CurrentLocation/CurrentLocation';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { ProgressBar } from 'components/molecules/ProgressBar/ProgressBar';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';
import { MusicControlButton } from 'components/molecules/music/MusicControlButton';

type ViewMemorialBookSize = 'large' | 'medium' | 'small';
type ViewMemorialBookTheme = 'focus' | 'hover' | 'white';
type ButtonIcon = 'SmallStarImg' | 'SmallEarthImg';

interface ProgressCardProps {
  title: string;
  fill: number;
  buttonTheme: ViewMemorialBookTheme;
  buttonSize: ViewMemorialBookSize;
  buttonDisabled: boolean;
  buttonText: string;
  buttonIcon: ButtonIcon;
  onButtonClick: () => void;
  className?: string;
  showMusicControl?: boolean; // 추가된 부분
}

const milestoneColors = [
  { min: 0, max: 6, message: ' 무지개를 완성해보아요' },
  { min: 7, max: 13, message: ' 빨강 무지개를 완성했어요.' },
  { min: 14, max: 20, message: ' 주황 무지개를 완성했어요.' },
  { min: 21, max: 27, message: ' 노랑 무지개를 완성했어요.' },
  { min: 28, max: 34, message: ' 초록 무지개를 완성했어요.' },
  { min: 35, max: 41, message: ' 파랑 무지개를 완성했어요.' },
  { min: 42, max: 48, message: ' 남색 무지개를 완성했어요.' },
  { min: 49, max: 49, message: ' 모든 무지개를 달성했어요!' },
];

const getMessage = (fill: number) => {
  for (const milestone of milestoneColors) {
    if (fill >= milestone.min && fill <= milestone.max) {
      return milestone.message;
    }
  }
  return '';
};

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  fill,
  buttonTheme,
  buttonSize,
  buttonDisabled,
  buttonText,
  buttonIcon,
  onButtonClick,
  className,
  showMusicControl = true, // 추가된 부분
}) => {
  const getIcon = () => {
    if (buttonIcon === 'SmallEarthImg') {
      return <LogoIcons variant='small-earth-img' />;
    } else {
      return <LogoIcons variant='small-star-img' />;
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center w-[340px] p-4 bg-[#f3f6fb] shadow-[0px_4px_4px_#00000040] ${className}`}
    >
      <div className='flex items-center justify-center w-full gap-6 mb-4'>
        <div className='w-fit font-kor-h-h2 text-greyscaleblack-100'>
          <CurrentLocation title={title} type='everstar' />
        </div>
      </div>

      <PrimaryButton
        theme={buttonTheme}
        size={buttonSize}
        disabled={buttonDisabled}
        onClick={onButtonClick}
        icon={getIcon()}
      >
        {buttonText}
      </PrimaryButton>

      <div className='flex flex-col items-center gap-4 p-2 mt-4 bg-white rounded-xl w-full'>
        {showMusicControl && <MusicControlButton duration={190} />}
        <div className='flex flex-col items-start gap-[8px] p-4 relative bg-white rounded-xl w-full'>
          <ProgressBar className='w-full' fill={fill} />
        </div>
        <div className='text-center w-full mt-2 font-kor-p-p2'>
          {title}
          {getMessage(fill)}
        </div>
      </div>
    </div>
  );
};
