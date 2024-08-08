import React from 'react';
import { InputContainer, InputContainerProps } from 'components/organics/input/InputContainer';
import { Glass } from 'components/molecules/Glass/Glass';

export const QuestOpenviduTemplate: React.FC<InputContainerProps> = ({
  headerText,
  textboxLabel,
  largeButtonText,
  smallButtonText,
}) => {
  return (
    <div className='relative flex items-center justify-center min-h-screen'>
      <Glass
        currentPage={1}
        totalPages={1}
        onPageChange={() => console.log('이동')}
        showPageIndicator={false}
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <InputContainer
          letterCardMessage='가까운 사람들과 화상통화로 마음을 나눠보세요!'
          headerText={headerText}
          letterCardType='default'
          letterCardColor='white'
          letterCardState='notReceived'
          centered={true}
          textboxLabel={textboxLabel}
          largeButtonText={largeButtonText}
          smallButtonText={smallButtonText}
          showPrimaryButton={true}
          isRtc={true}
        />
      </div>
    </div>
  );
};
