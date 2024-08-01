import React, { useState } from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { Textbox } from 'components/molecules/input/Textbox';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';

interface IntroduceWriteProps {
  isOpen: boolean;
  onClose: () => void;
  onResend: () => void;
  onVerify: (code: string) => void;
  text: string;
  height?: string;
}

export const IntroduceWrite: React.FC<IntroduceWriteProps> = ({
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
    <Modal isOpen={isOpen} onClose={onClose} text='소개글 쓰기'>
      <div className='flex flex-col justify-between w-full h-full'>
        <div className='flex flex-col'>
          <div
            className="left-0 [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal] "
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div className='mt-6'>
            <Textbox
              type='large'
              className=''
              label='내용'
              showInfoText={true}
              infoText='0/255'
              infoTextAlign='left'
              showStar={false}
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
            hug={true}
          >
            작성완료
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export type { IntroduceWriteProps };
