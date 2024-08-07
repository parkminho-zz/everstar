import React, { useState } from 'react';
import { MoveContainer } from 'components/organics/input/MoveContainer/MoveContainer';
import { SearchVisitStar } from './SearchVisitStar';
import { Glass } from 'components/molecules/Glass/Glass';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import { useFetchPetExplore } from 'hooks/useEverStar';

export const SearchStar = (): JSX.Element => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { refetch } = useFetchPetExplore();
  const handleNextPage1Click = async () => {
    try {
      const result = await refetch();
      if (result.data) {
        navigate(`/everstar/${result.data.id}`);
      }
    } catch (error) {
      console.error('Error fetching random pet:', error);
    }
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
          onNextPage1Click={handleNextPage1Click}
          onNextPage2Click={handleModalOpen}
          onLeftIconClick={() => navigate(`/everstar/${petId}`)}
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
