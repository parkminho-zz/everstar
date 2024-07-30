import React from 'react';
import { LetterCard } from 'components/molecules/cards/LetterCard/LetterCard';
import { Textbox } from 'components/molecules/input/Textbox';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';

interface InputContainerProps {
  headerText: string;
  letterCardType: 'default' | 'send' | 'receive';
  letterCardColor: 'white' | 'bgorange' | 'orange' | 'gray';
  letterCardState: 'received' | 'notReceived';
  letterCardMessage: string;
  letterCardFontFamily: string;
  textboxLabel: string;
  largeButtonText: string;
  smallButtonText: string;
}

export const InputContainer: React.FC<InputContainerProps> = ({
  headerText,
  letterCardType,
  letterCardColor,
  letterCardState,
  letterCardMessage,
  letterCardFontFamily="var(--kor-p-p1-font-family)",
  textboxLabel,
  largeButtonText,
  smallButtonText,
}) => {
  const handleButtonClick = () => {
    console.log('Primary Button Clicked');
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100">
      <div className="flex flex-col items-center w-[360px] gap-8 p-5 bg-white rounded-lg shadow-md">
        {/* Header */}
        <header className="w-full py-4">
          <h1 className="text-2xl font-bold text-center">{headerText}</h1>
        </header>

        {/* Content */}
        <div className="flex flex-col items-center w-full gap-8">
          {/* Letter Card */}
          <div>
            <LetterCard
              type={letterCardType}
              color={letterCardColor}
              state={letterCardState}
              message={letterCardMessage}
              fontFamily={letterCardFontFamily}
            />
          </div>

          {/* Textbox */}
          <Textbox type="large" className="" label={textboxLabel} />

          {/* Large Primary Button */}
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
