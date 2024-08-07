import React, { useState } from 'react';
import { MoveContainer } from 'components/organics/input/MoveContainer/MoveContainer';
import { SearchVisitStar } from './SearchVisitStar';
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
    <div className='relative flex flex-col items-center justify-center min-h-screen'>
      <div className='relative z-10 flex flex-col items-center justify-center w-full h-full p-12'>
        <MoveContainer
          title={'영원별 이동'}
          nextPage1={'random'}
          nextPage2={'search'}
          onNextPage1Click={handleNextPage1Click}
          onNextPage2Click={handleModalOpen}
          onLeftIconClick={() => navigate(`/everstar/${petId}`)}
        />
        <SearchVisitStar
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onVerify={(code) => console.log('Verified code:', code)}
          text=''
          onResend={() => {}}
        />
      </div>
    </div>
  );
};
