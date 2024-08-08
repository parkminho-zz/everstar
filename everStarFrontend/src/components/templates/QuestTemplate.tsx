import React from 'react';
import { InputContainer, InputContainerProps } from 'components/organics/input/InputContainer';
import { Glass } from 'components/molecules/Glass/Glass';

export const QuestTemplate: React.FC<InputContainerProps> = ({
  headerText,
  letterCardType,
  letterCardColor,
  letterCardState,
  letterCardMessage,
  letterCardClassName,
  centered,
  textboxLabel,
  largeButtonText,
  smallButtonText,
  showPrimaryButton,
  petName,
  myName,
  myMessage,
  dateTime,
}) => {
  // headerText와 letterCardMessage를 오버라이드
  const customHeaderText = headerText;
  const customLetterCardMessage = letterCardMessage;

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <Glass
        currentPage={1}
        totalPages={1}
        onPageChange={() => console.log('이동')}
        showPageIndicator={false}
        className="w-full h-auto sm:w-4/5 md:w-3/5 lg:w-2/5 sm:h-4/5"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <InputContainer
          headerText={customHeaderText}
          letterCardType={letterCardType}
          letterCardColor={letterCardColor}
          letterCardState={letterCardState}
          letterCardMessage={customLetterCardMessage}
          letterCardClassName={letterCardClassName}
          centered={centered}
          textboxLabel={textboxLabel}
          largeButtonText={largeButtonText}
          smallButtonText={smallButtonText}
          showPrimaryButton={showPrimaryButton}
          petName={petName}
          myName={myName}
          myMessage={myMessage}
          dateTime={dateTime}
        />
      </div>
    </div>
  );
};
