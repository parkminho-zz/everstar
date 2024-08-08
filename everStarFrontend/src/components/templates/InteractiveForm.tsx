import React from 'react';
import { InputContainer, InputContainerProps } from 'components/organics/input/InputContainer';
import { Glass } from 'components/molecules/Glass/Glass';

interface InteractiveFormProps extends InputContainerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  customText?: string; // 커스텀 텍스트 속성 추가
}

export const InteractiveForm: React.FC<InteractiveFormProps> = ({
  currentPage,
  totalPages,
  onPageChange,
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
  customText, // 커스텀 텍스트 속성 추가
  petName,
  myName,
  myMessage,
  dateTime,
}) => {
  // Override headerText and letterCardMessage for this specific component
  const customHeaderText = headerText;
  const customLetterCardMessage = letterCardMessage;

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <Glass
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
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
          customText={customText} // 커스텀 텍스트 속성 전달
          petName={petName}
          myName={myName}
          myMessage={myMessage}
          dateTime={dateTime}
        />
      </div>
    </div>
  );
};
