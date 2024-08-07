import React from 'react';
import { CurrentLocation } from 'components/molecules/EverStar/CurrentLocation/CurrentLocation';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { ProgressBar } from 'components/molecules/ProgressBar/ProgressBar';
import { useMediaQuery } from 'react-responsive';
import bgImage from 'assets/images/bg-earth.webp';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';
import { Rainbow } from 'components/atoms/symbols/Rainbow/Rainbow';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';

type ViewMemorialBookSize = 'large' | 'medium' | 'small';
type RainbowColor =
  | 'none'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'violet';

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

const milestoneColors = [
  { min: 0, max: 6, message: '와 무지개를 완성해보아요' },
  { min: 7, max: 13, message: '와 빨강 무지개를 완성했어요.' },
  { min: 14, max: 20, message: '와 주황 무지개를 완성했어요.' },
  { min: 21, max: 27, message: '와 노랑 무지개를 완성했어요.' },
  { min: 28, max: 34, message: '와 초록 무지개를 완성했어요.' },
  { min: 35, max: 41, message: '와 파랑 무지개를 완성했어요.' },
  { min: 42, max: 48, message: '와 남색 무지개를 완성했어요.' },
  { min: 49, max: 49, message: '와 모든 무지개를 달성했어요!' },
];

const getMessage = (fill: number) => {
  for (const milestone of milestoneColors) {
    if (fill >= milestone.min && fill <= milestone.max) {
      return milestone.message;
    }
  }
  return '';
};

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

  // const isDisabled = fill < 49;
  const progressButtonText = () => {
    if (fill >= 49) return '모든 퀘스트를 완료했습니다!';
    if (buttonDisabled) {
      return `${fill}일차 퀘스트를 완료했습니다!`;
    }
    return `${fill + 1}일차 퀘스트가 도착했습니다!`;
  };
  const getIcon = () => {
    if (buttonIcon === 'SmallEarthImg') {
      return <LogoIcons variant='small-earth-img' />;
    } else {
      return <LogoIcons variant='small-star-img' />;
    }
  };

  const getRainbowStyle = () => {
    if (isMobile) {
      return 'absolute right-0 bottom-0 !w-[375px] !h-[667px] mb-48 mr-[-20px] ';
    } else if (isTabletOrMobile) {
      return 'absolute left-0 bottom-0 !w-[768px] !h-[800px] mb-64';
    } else {
      return 'absolute left-0 bottom-0 !w-[1280px] !h-[1024px] mb-[-70px]';
    }
  };

  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);

  return (
    <div
      className='relative flex flex-col min-h-screen overflow-hidden bg-center bg-cove'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Rainbow className={getRainbowStyle()} color={getColor(fill)} />
      <div className='relative z-10 flex flex-col items-center justify-center flex-grow'>
        <div
          className={`relative flex flex-col w-72 h-[200px] items-start gap-[10px] pl-2 pr-2 py-4 bg-[#f3f6fb] shadow-[0px_4px_4px_#00000040] ${className}`}
        >
          <div className='flex w-64 items-center justify-center gap-6 relative flex-[0_0_auto]'>
            <div className='relative w-fit mt-[-1.00px] font-kor-h-h2 font-[number:var(--kor-h-h2-font-weight)] text-greyscaleblack-100 text-[length:var(--kor-h-h2-font-size)] tracking-[var(--kor-h-h2-letter-spacing)] leading-[var(--kor-h-h2-line-height)] [font-style:var(--kor-h-h2-font-style)]'>
              <CurrentLocation title={title} type='earth' />
            </div>
          </div>
          <div className='flex justify-center w-full mt-0'>
            <PrimaryButton
              theme='white'
              size={buttonSize}
              disabled={false}
              onClick={handleButtonClick}
              icon={getIcon()}
            >
              {buttonText}
            </PrimaryButton>
          </div>
          <div className='flex flex-col items-start gap-[8px] p-4 relative bg-white rounded-xl w-full'>
            <ProgressBar className='w-full' fill={fill} />
          </div>
          <div className='relative w-[260px] h-[14px] mr-[-2.00px] font-kor-p-p2 font-[number:var(--kor-p-p2-font-weight)] text-black text-[length:var(--kor-p-p2-font-size)] text-center tracking-[var(--kor-p-p2-letter-spacing)] leading-[var(--kor-p-p2-line-height)] whitespace-nowrap [font-style:var(--kor-p-p2-font-style)]'>
            {title}
            {getMessage(fill)}
          </div>
        </div>
        <div className='flex items-center justify-center mt-48'>
          <PrimaryButton
            theme='white'
            size='large'
            disabled={buttonDisabled}
            onClick={() => navigate(`/earth/quest/${fill + 1}`)}
            icon={null}
          >
            {progressButtonText()}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
