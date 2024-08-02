import React, { useState } from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Select } from 'components/molecules/input/Select';
import { Textbox } from 'components/molecules/input/Textbox';

interface SearchVisitStarProps {
  isOpen: boolean;
  onClose: () => void;
  onResend: () => void;
  onVerify: (code: string) => void;
  text: string;
  height?: string;
}

export const SearchVisitStar: React.FC<SearchVisitStarProps> = ({
  isOpen,
  onClose,
  onVerify,
  text,
}) => {
  const [verificationCode] = useState('');

  const colorOptions = ['11', '2', '33', '44', '55', '6', '77'];

  const handleVerify = () => {
    onVerify(verificationCode);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} text='방문할 영원별 찾기'>
      <div className='flex flex-col justify-between w-full h-full'>
        <div className='flex flex-col'>
          <div
            className="left-0 [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal] "
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div className="[font-family:'Noto_Sans_KR-Bold'] font-bold text-[#1f2329] text-sm tracking-[-1.12px] leading-[normal]">
            <Textbox
              type={'small'}
              label={'반려동물 이름을 검색해주세요'}
              showInfoText={false}
              showStar={false}
            />
          </div>
          <div className='mt-6'>
            <Select
              options={colorOptions}
              title={''}
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
            작성 완료
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export type { SearchVisitStarProps };
