import React from 'react';
import { CurrentLocation } from 'components/molecules/EverStar/CurrentLocation/CurrentLocation';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { ProgressBar } from 'components/molecules/ProgressBar/ProgressBar';
import { useMediaQuery } from 'react-responsive';
import bgImage from 'assets/images/bg-everstar.png';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import { BookIcons } from 'components/atoms/symbols/Book/BookIcons';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';
import { MusicControlButton } from 'components/molecules/music/MusicControlButton';

type ViewMemorialBookTheme = 'focus' | 'hover' | 'white';
type ViewMemorialBookSize = 'large' | 'medium' | 'small';

interface EverStarMainProps {
  title: string;
  fill: number;
  className?: string;
  buttonTheme: ViewMemorialBookTheme;
  buttonSize: ViewMemorialBookSize;
  buttonDisabled: boolean;
  buttonText: string;
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface ViewMemorialBookProps {
  theme: ViewMemorialBookTheme;
  size: ViewMemorialBookSize;
  disabled: boolean;
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
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

const ViewMemorialBook: React.FC<ViewMemorialBookProps> = ({
  theme,
  size,
  children,
  onClick,
  disabled,
}) => {
  const focus = 'bg-mainprimary text-greyscalewhite hover:bg-bgorange';
  const white = 'bg-white text-mainsecondary hover:bg-bgorange';
  const hover = 'bg-bgorange text-mainsecondary hover:bg-mainprimary';
  const disabledStyle = 'disabled:bg-greyscaleblack-20 disabled:text-greyscaleblack-60';

  const color: Record<ViewMemorialBookTheme, string> = {
    focus,
    white,
    hover,
  };

  const large = 'w-[320px] h-[64px]';
  const medium = 'w-[134px] h-[48px]';
  const small = 'w-[106px] h-[40px]';

  const sizeStyle: Record<ViewMemorialBookSize, string> = {
    large,
    medium,
    small,
  };

  const getTextStyle = () => {
    switch (size) {
      case 'large':
        return 'kor-h-h4';
      case 'medium':
        return 'kor-subtitle-subtitle3';
      case 'small':
        return 'kor-p-p5';
      default:
        return '';
    }
  };

  return (
    <button
      className={`
        flex
        items-center
        justify-between
        rounded-lg
        px-2
        ${disabledStyle}
        ${color[theme]}
        ${sizeStyle[size]}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={`flex-grow mx-auto text-center ${getTextStyle()}`}>{children}</span>
    </button>
  );
};

export const EverStarMain: React.FC<EverStarMainProps> = ({
  title,
  fill,
  buttonTheme,
  buttonSize,
  buttonDisabled,
  buttonText,
  onButtonClick,
  className,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  const headerType = isMobile
    ? 'mobile-everstar'
    : isTabletOrMobile
      ? 'tablet-everstar'
      : 'everstar';

  const footerType = isMobile ? 'mobile' : isTabletOrMobile ? 'tablet' : 'desktop';

  const isDisabled = fill < 49;
  const progressButtonText = isDisabled
    ? '아직 메모리얼북을 열람할 수 없어요'
    : '메모리얼북 열람하기';
  const progressButtonTheme = isDisabled ? 'white' : 'focus';

  return (
    <div
      className='flex flex-col min-h-screen bg-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header type={headerType} className='sticky top-0 z-50' />
      <div className='flex flex-col items-center justify-center flex-grow'>
        <div
          className={`flex flex-col w-72 h-[300px] items-start gap-[10px] pl-2 pr-2 py-4 relative bg-[#f3f6fb] shadow-[0px_4px_4px_#00000040] ${className}`}
        >
          <div className='flex w-64 items-center justify-center gap-6 relative flex-[0_0_auto]'>
            <div className='relative w-fit mt-[-1.00px] font-kor-h-h2 font-[number:var(--kor-h-h2-font-weight)] text-greyscaleblack-100 text-[length:var(--kor-h-h2-font-size)] tracking-[var(--kor-h-h2-letter-spacing)] leading-[var(--kor-h-h2-line-height)] [font-style:var(--kor-h-h2-font-style)]'>
              <CurrentLocation title={title} type='everstar' />
            </div>
          </div>

          <div className='flex justify-center w-full mt-0'>
            <PrimaryButton
              theme={buttonTheme}
              size={buttonSize}
              disabled={buttonDisabled}
              onClick={onButtonClick}
              icon={<LogoIcons variant='small-earth-img' />}
            >
              {buttonText}
            </PrimaryButton>
          </div>

          <div className='flex flex-col items-start gap-[15px] p-1 relative bg-white rounded-xl w-full '>
            <MusicControlButton duration={190} />
          </div>

          <div className='flex flex-col items-start gap-[8px] p-4 relative bg-white rounded-xl w-full'>
            <ProgressBar className='w-full' fill={fill} />
          </div>
          <div className='relative w-[260px] h-[14px] mr-[-2.00px] font-kor-p-p2 font-[number:var(--kor-p-p2-font-weight)] text-black text-[length:var(--kor-p-p2-font-size)] text-center tracking-[var(--kor-p-p2-letter-spacing)] leading-[var(--kor-p-p2-line-height)] whitespace-nowrap [font-style:var(--kor-p-p2-font-style)]'>
            {title}
            {getMessage(fill)}
          </div>
        </div>

        <div className='mt-20'>
          <BookIcons variant='book-close' />
        </div>

        <div className='flex items-center justify-center mt-3'>
          <ViewMemorialBook
            theme={progressButtonTheme}
            size='large'
            disabled={isDisabled}
            onClick={() => alert('버튼 클릭됨')}
          >
            {progressButtonText}
          </ViewMemorialBook>
        </div>
      </div>
      <Footer type={footerType} className='mt-auto' />
    </div>
  );
};
