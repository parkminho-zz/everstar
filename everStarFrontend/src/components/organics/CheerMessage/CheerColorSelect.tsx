import React, { useState } from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';

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
          <div className='mt-6'>{/* ㅁㄴㅇㅁㄴㄹㄴㅇㄴㅁㄹㅇㅎ */}</div>
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
