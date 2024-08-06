import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileSelection } from 'components/organics/ProfileSelection/ProfileSelection';
import { PetInfoForm } from 'components/organics/PetInfoForm/PetInfoForm';
import { SearchModal } from 'components/organics/SearchModal/SearchModal';
import { RootState } from 'store/Store';
import { useFetchPets, useAddPet } from 'hooks/usePets';

export const Profile: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const { data: pets, isLoading, error } = useFetchPets(token);
  const { mutate: addPet } = useAddPet(token);

  const [isPetInfoOpen, setPetInfoOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

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

      addPet(currentFormData, {
        onSuccess: (data) => {
          console.log('반려동물을 성공적으로 추가했습니다:', data);
          setPetInfoOpen(false);
        },
        onError: (error) => {
          console.error('반려동물 추가 에러:', error);
        },
      });

      setCurrentFormData(null);
    } else {
      console.log('currentFormData is null');
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className='text-red-500'>{error.message}</div>;

  return (
    <div className='flex items-center justify-center flex-grow'>
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
                  id: pet.id,
                }))
              : []
          }
          onAddAvatar={() => setPetInfoOpen(true)}
        />
      )}
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
