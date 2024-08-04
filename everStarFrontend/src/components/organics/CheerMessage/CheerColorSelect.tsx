import React, { useState } from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Select } from 'components/molecules/input/Select';

interface CheerColorSelectProps {
  isOpen: boolean;
  onClose: () => void;
  onResend: () => void;
  onVerify: (code: string) => void;
  text: string;
  height?: string;
}

export const CheerColorSelect: React.FC<CheerColorSelectProps> = ({
  isOpen,
  onClose,
  onVerify,
  text,
}) => {
  const [verificationCode] = useState('');

  const colorOptions = [
    '빨간색',
    '주황색',
    '노란색',
    '초록색',
    '파란색',
    '남색',
    '보라색',
  ];

  const handleVerify = () => {
    onVerify(verificationCode);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} text='색상 정보 선택'>
      <div className='flex flex-col justify-between w-full h-full'>
        <div className='flex flex-col'>
          <div
            className="left-0 [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal] "
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div className='mt-6'>
            <Select
              options={colorOptions}
              title={'포스트잇 색깔을 선택해주세요'}
              showLabel={false}
              onOptionSelect={function (): void {}}
              infoText={''}
            />
          </div>
        </div>
        <div className='flex justify-end w-full mt-10'>
          <PrimaryButton
            theme='white'
            size='large'
            onClick={handleVerify}
            disabled={false}
            icon={null}
          >
            선택 완료
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export type { CheerColorSelectProps };
