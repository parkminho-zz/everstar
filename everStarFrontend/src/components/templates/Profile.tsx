import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useQuery, useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import { Glass } from 'components/molecules/Glass/Glass';
import { ProfileSelection } from 'components/organics/ProfileSelection/ProfileSelection';
import { PetInfoForm, PetFormData } from 'components/organics/PetInfoForm/PetInfoForm';
import { SearchModal } from 'components/organics/SearchModal/SearchModal';
import bgImage from 'assets/images/bg-everstar.png';
import { RootState } from 'store/Store';

interface Pet {
  id: number;
  profileImageUrl: string;
  name: string;
}

interface ApiResponse {
  data: Pet[];
}

const fetchPets = async (token: string): Promise<Pet[]> => {
  const response = await fetch('https://i11b101.p.ssafy.io/api/pets', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log(token);
    throw new Error('반려동물 정보를 가져오는 데 실패했습니다');
  }
  const result: ApiResponse = await response.json();
  return result.data;
};

const addPet = async (petData: PetFormData, token: string) => {
  const formData = new FormData();
  formData.append('name', petData.name);
  formData.append('age', petData.age.toString());
  formData.append('memorialDate', petData.memorialDate?.toISOString().split('T')[0] || '');
  formData.append('species', petData.species);
  formData.append('gender', petData.gender);
  formData.append('relationship', petData.relationship);
  formData.append('profileImageUrl', petData.profileImageUrl as File);
  formData.append('introduction', petData.introduction);
  formData.append('questIndex', '1'); // questIndex 고정
  formData.append('personality', JSON.stringify(petData.personality));

  const response = await fetch('https://i11b101.p.ssafy.io/api/pets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('반려동물을 추가하는 데 실패했습니다');
  }

  return response.json();
};

export const Profile: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const {
    data: pets,
    isLoading,
    error,
  } = useQuery<Pet[], Error>('pets', () => fetchPets(token), {
    enabled: !!token,
  });

  const [isPetInfoOpen, setPetInfoOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<PetFormData | null>(null);

  const { mutate: mutateAddPet } = useMutation((petData: PetFormData) => addPet(petData, token), {
    onSuccess: () => {
      console.log('반려동물을 성공적으로 추가했습니다');
      setPetInfoOpen(false);
    },
    onError: (error: Error) => {
      console.error('반려동물 추가 에러:', error.message);
    },
  });

  const handlePetFormSubmit = (formData: PetFormData) => {
    setCurrentFormData({ ...formData, personality: [] }); // 초기에는 빈 배열로 설정
    setPetInfoOpen(false);
    setSearchModalOpen(true);
  };

  const handleSearchModalSubmit = (personalities: string[]) => {
    setSearchModalOpen(false);
    if (currentFormData) {
      const updatedFormData = {
        ...currentFormData,
        personality: personalities,
      };
      mutateAddPet(updatedFormData);
      setCurrentFormData(null); // Clear the current form data after submission
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;

  return (
    <div
      className="relative flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header
        type={isMobile ? 'mobile-everstar' : isTabletOrMobile ? 'tablet-everstar' : 'everstar'}
        className="sticky top-0 z-50"
      />
      <Glass
        variant={isMobile ? 'mobile' : isTabletOrMobile ? 'tablet' : 'desktop'}
        currentPage={1}
        totalPages={1}
        onPageChange={(newPage) => console.log('페이지 변경:', newPage)}
        showPageIndicator={false}
        className="z-10"
      />
      <div className="z-20 flex items-center justify-center flex-grow">
        {isPetInfoOpen ? (
          <PetInfoForm
            headerText="반려동물 정보 입력"
            smallButtonText=""
            text="반려동물 정보를 <br/> 입력해주세요."
            showPrimaryButton={true}
            onClose={() => setPetInfoOpen(false)}
            onSubmit={handlePetFormSubmit}
            relationshipOptions={[
              '엄마',
              '아빠',
              '언니',
              '누나',
              '형',
              '오빠',
              '이모',
              '삼촌',
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
        className="relative z-10 mt-auto"
      />
      {isSearchModalOpen && (
        <SearchModal
          searchOptions={['친근한', '충성스러운', '활발한', '차분한', '보호적인']}
          modalTitle="반려동물 성격 선택"
          buttonLabel="작성 완료"
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
