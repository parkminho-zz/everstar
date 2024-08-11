import React, { useState } from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { Textbox } from 'components/molecules/input/Textbox';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Toggle } from 'components/atoms/buttons/Toggle';
import { InputField } from 'components/organics/input/InputFields';

interface CheerMessageWriteProps {
  isOpen: boolean;
  onClose: () => void;
  onResend: () => void;
  onVerify: (code: string) => void;
  text: string;
  height?: string;
  infoText?: string;
}

export const CheerMessageWrite: React.FC<CheerMessageWriteProps> = ({
  isOpen,
  onClose,
  onVerify,
  text,
}) => {
  const [message, setMessage] = useState('');
  const [isToggleOn, setIsToggleOn] = useState<'on' | 'off'>('off');

  const handleVerify = () => {
    onVerify(message);
    setMessage('');
  };

  const handleToggleChange = (status: 'on' | 'off') => {
    setIsToggleOn(status);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} text='응원메시지 작성하기'>
      <div className='flex flex-col justify-between w-full h-full'>
        <div className='flex flex-col'>
          <div
            className="left-0 [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal]"
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div className='mt-6'>
            <Textbox
              type='large'
              className=''
              label='내용'
              showInfoText={true}
              infoText={message.length ? `${message.length}/255` : ''}
              infoTextAlign='left'
              showStar={false}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={255}
            />
          </div>
        </div>
        <Toggle status={isToggleOn} onChange={handleToggleChange} />
        {isToggleOn === 'on' && (
          <InputField
            label={''}
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state={'focus'}
            text={''}
            showCheckIcon={false}
          />
        )}
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

export type { CheerMessageWriteProps };
