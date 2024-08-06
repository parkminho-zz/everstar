import React, { useState } from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Search } from 'components/molecules/input/Search';

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
        </div>
        <Search
          initialState={'disable'}
          options={[]}
          onOptionSelect={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
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
