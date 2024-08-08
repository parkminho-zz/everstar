import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Rainbow } from 'components/atoms/symbols/Rainbow/Rainbow';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import { ProgressCard } from 'components/organics/ProgressCard/ProgressCard';

type ViewMemorialBookSize = 'large' | 'medium' | 'small';
type RainbowColor = 'none' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

interface EarthMainProps {
  title: string;
  fill: number;
  className?: string;
  buttonSize: ViewMemorialBookSize;
  buttonDisabled: boolean;
  buttonText: string;
  buttonIcon: 'SmallStarImg' | 'SmallEarthImg';
  onButtonClick: () => void;
}

const rainbowColors: { min: number; max: number; color: RainbowColor }[] = [
  { min: 0, max: 6, color: 'none' },
  { min: 7, max: 13, color: 'red' },
  { min: 14, max: 20, color: 'orange' },
  { min: 21, max: 27, color: 'yellow' },
  { min: 28, max: 34, color: 'green' },
  { min: 35, max: 41, color: 'blue' },
  { min: 42, max: 48, color: 'indigo' },
  { min: 49, max: 49, color: 'violet' },
];

const getColor = (fill: number) => {
  for (const rainbow of rainbowColors) {
    if (fill >= rainbow.min && fill <= rainbow.max) {
      return rainbow.color;
    }
  }
  return 'none';
};

export const EarthMain: React.FC<EarthMainProps> = ({
  title,
  fill,
  buttonSize,
  buttonDisabled,
  buttonText,
  onButtonClick,
  buttonIcon,
  className,
}) => {
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  const handleButtonClick = () => {
    onButtonClick();
    navigate(`/everstar/${petId}`);
  };

  const getRainbowStyle = () => {
    if (isMobile) {
      return 'absolute right-0 bottom-0 w-[375px] h-[667px] mb-48 mr-[-20px] ';
    } else if (isTabletOrMobile) {
      return 'absolute left-0 bottom-0 w-[768px] h-[800px] mb-64';
    } else {
      return 'absolute left-0 bottom-0 w-[1280px] h-[1024px] mb-[-70px]';
    }
  };

  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen'>
      <Rainbow className={getRainbowStyle()} color={getColor(fill)} />
      <div className='relative z-10 flex flex-col items-center justify-center flex-grow'>
        <ProgressCard
          title={title}
          fill={fill}
          buttonTheme='white'
          buttonSize={buttonSize}
          buttonDisabled={buttonDisabled}
          buttonText={buttonText}
          buttonIcon={buttonIcon}
          onButtonClick={handleButtonClick}
          showMusicControl={false}
          className={className}
        />
      </div>
    </div>
  );
};
