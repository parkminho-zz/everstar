import React from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';

export interface InputContainerProps {
  headerText: string;

  textboxLabel: string;
  largeButtonText: string;
  smallButtonText: string;
  showPrimaryButton?: boolean;
}

export const InputContainer: React.FC<InputContainerProps> = ({ headerText, smallButtonText }) => {
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
