import React from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { LetterCard } from 'components/molecules/cards/LetterCard/LetterCard';
import { Textbox } from 'components/molecules/input/Textbox';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';

interface InputContainerProps {
  headerText: string;
  letterCardType?: 'default' | 'send' | 'receive';
  letterCardColor?: 'white' | 'bgorange' | 'orange' | 'gray';
  letterCardState?: 'received' | 'notReceived';
  letterCardMessage?: string;
  letterCardClassName?: string;
  centered?: boolean;

  textboxLabel: string;
  largeButtonText: string;
  smallButtonText: string;
  showPrimaryButton?: boolean;
}

export const InputContainer: React.FC<InputContainerProps> = ({
  headerText,
  letterCardType,
  letterCardColor = 'white', // 기본값 설정
  letterCardState = 'notReceived', // 기본값 설정
  letterCardMessage,
  letterCardClassName = 'font-body !kor-subtitle-subtitle3', // 여기서 폰트 변경
  centered = true,
  textboxLabel,
  largeButtonText,
  smallButtonText,
  showPrimaryButton = true,
}) => {
  const handleButtonClick = () => {
    console.log('Primary Button Clicked');
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100">
      <div className="flex flex-col items-center w-[360px] gap-8 p-5 bg-white rounded-lg shadow-md">
        {/* Modal Header */}
        <ModalHeader text={headerText} showLeftIcon={true} />

        {/* Content */}
        <div className="flex flex-col items-center w-full gap-8">
          <div className="flex flex-col items-center w-full">
            {/* Letter Card or Custom Text */}
            {letterCardType ? (
              <LetterCard
                type={letterCardType}
                color={letterCardColor}
                state={letterCardState}
                message={letterCardMessage}
                className={letterCardClassName}
                centered={centered}
              />
            ) : (
              <div className="w-full">
                <div className="left-0 [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal]">
                  사랑하는 반려동물에게 <br /> 편지를 보내보세요
                </div>
              </div>
            )}
          </div>

          {/* Textbox */}
          <Textbox type="large" className="" label={textboxLabel} />

          {/* Large Primary Button */}
          {showPrimaryButton && (
            <div className="flex justify-center w-full">
              <PrimaryButton
                theme="white"
                size="large"
                onClick={handleButtonClick}
                disabled={false}
                icon={null}
              >
                {largeButtonText}
              </PrimaryButton>
            </div>
          )}

          {/* Small Primary Button */}
          <div className="flex justify-end w-full">
            <PrimaryButton
              theme="white"
              size="small"
              onClick={handleButtonClick}
              disabled={false}
              icon={null}
            >
              {smallButtonText}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
