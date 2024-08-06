import React, { useState } from 'react';
import { MoveContainer } from 'components/organics/input/MoveContainer/MoveContainer';
import { SearchVisitStar } from './SearchVisitStar';
import { Glass } from 'components/molecules/Glass/Glass';
import { useNavigate } from 'react-router-dom';

export const SearchStar = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='relative flex flex-col items-center p-12'>
      <div className='absolute flex items-center justify-center top-20 bottom-[-2rem] right-[10rem] left-[10rem] inset-10 zIndex-1 '>
        <Glass
          variant='desktop'
          currentPage={0}
          totalPages={0}
          showPageIndicator={false}
          onPageChange={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>

      <div className='relative z-10 flex flex-col items-center mt-40'>
        <MoveContainer
          title={'영원별 이동'}
          nextPage1={'random'}
          nextPage2={'search'}
          // onNextPage1Click={}
          onNextPage2Click={handleModalOpen}
          onLeftIconClick={() => navigate('/everstar/1')}
        />
        <SearchVisitStar
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onVerify={(code) => console.log('Verified code:', code)}
          text=''
          onResend={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
};
