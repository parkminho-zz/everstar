import React from 'react';
import { InputContainer, InputContainerProps } from 'components/organics/input/InputContainer';
import { Glass } from 'components/molecules/Glass/Glass';
import { useMediaQuery } from 'react-responsive';

export const QuestRtcTemplate: React.FC<InputContainerProps> = ({
  headerText,
  textboxLabel,
  largeButtonText,
  smallButtonText,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1199 });

  return (
    <div className='relative flex items-center justify-center min-h-screen'>
      <Glass
        variant={isMobile ? 'mobile' : isTabletOrMobile ? 'tablet' : 'desktop'}
        currentPage={1}
        totalPages={1}
        onPageChange={() => console.log('이동')}
        showPageIndicator={false}
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <InputContainer
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
