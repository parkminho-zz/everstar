import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import { Glass } from 'components/molecules/Glass/Glass';
import { ProfileSelection } from 'components/organics/ProfileSelection/ProfileSelection';
import { PetInfoForm } from 'components/organics/PetInfoForm/PetInfoForm';
import { SearchModal } from 'components/organics/SearchModal/SearchModal';
import bgImage from 'assets/images/bg-everstar.webp';
import { RootState } from 'store/Store';
import { useFetchPets, useAddPet } from 'hooks/usePets';

export const Profile: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const { data: pets, isLoading, error } = useFetchPets(token);
  console.log('Token:', token);

  const [isPetInfoOpen, setPetInfoOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

  const { mutate: addPet } = useAddPet(token);

  const handlePetFormSubmit = (formData: FormData) => {
    setCurrentFormData(formData);
    setPetInfoOpen(false);
    setSearchModalOpen(true);
  };

  const handleSearchModalSubmit = async (personalities: string[]) => {
    setSearchModalOpen(false);
    if (currentFormData) {
      const requestDtoBlob = currentFormData.get('requestDto') as Blob;
      const requestDtoText = await requestDtoBlob.text();
      const requestDto = JSON.parse(requestDtoText);
      requestDto.personalities = personalities;
      currentFormData.set(
        'requestDto',
        new Blob([JSON.stringify(requestDto)], { type: 'application/json' }),
      );

      addPet(currentFormData);
      setCurrentFormData(null);
    } else {
      console.log('currentFormData is null');
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className='text-red-500'>{error.message}</div>;

  return (
    <div
      className='relative flex flex-col min-h-screen bg-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header
        type={
          isMobile
            ? 'mobile-everstar'
            : isTabletOrMobile
              ? 'tablet-everstar'
              : 'everstar'
        }
        className='sticky top-0 z-50'
      />
      <Glass
        variant={isMobile ? 'mobile' : isTabletOrMobile ? 'tablet' : 'desktop'}
        currentPage={1}
        totalPages={1}
        onPageChange={(newPage) => console.log('페이지 변경:', newPage)}
        showPageIndicator={false}
        className='z-10'
      />
      <div className='z-20 flex items-center justify-center flex-grow'>
        {isPetInfoOpen ? (
          <PetInfoForm
            headerText='반려동물 정보 입력'
            showPrimaryButton={true}
            text='반려동물 정보를 입력해주세요.'
            onClose={() => setPetInfoOpen(false)}
            onSubmit={handlePetFormSubmit}
            relationshipOptions={[
              '엄마',
              '아빠',
              '언니',
              '누나',
              '형',
              '오빠',
              '친구',
            ]}
          />
        ) : (
          <ProfileSelection
            avatars={
              Array.isArray(pets)
                ? pets.map((pet) => ({
                    src: pet.profileImageUrl,
                    size: 'medium',
                    name: pet.name,
                  }))
                : []
            }
            onAddAvatar={() => setPetInfoOpen(true)}
          />
        )}
      </div>
      <Footer
        type={isMobile ? 'mobile' : isTabletOrMobile ? 'tablet' : 'desktop'}
        className='relative z-10 mt-auto'
      />
      {isSearchModalOpen && (
        <SearchModal
          searchOptions={[
            '친근한',
            '충성스러운',
            '활발한',
            '차분한',
            '보호적인',
          ]}
          modalTitle='반려동물 성격 선택'
          buttonLabel='작성 완료'
          onClose={() => {
            setSearchModalOpen(false);
            setPetInfoOpen(true);
          }}
          onSubmit={handleSearchModalSubmit}
        />
      )}
    </div>
  );
};
