import React, { useEffect, useState } from 'react';
import { ProgressCard } from 'components/organics/ProgressCard/ProgressCard';
import { ViewMemorialBook } from 'components/organics/ViewMemorialBook/ViewMemorialBook';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';

interface EverStarMainProps {
  petProfile: {
    name: string;
    age: number;
    date: string;
    description: string;
    tagList: string[];
    avatarUrl: string;
    questIndex: number;
  } | null;
  buttonDisabled: boolean;
  memorialBookProfile: {
    id: number;
    psychologicalTestResult: string | null;
    isOpen: boolean;
    isActive: boolean;
  } | null;
  petId: number;
  handleToggle?: (status: 'off' | 'on') => void;
}

export const EverStarMain: React.FC<EverStarMainProps> = ({
  petProfile: initialPetProfile,
  buttonDisabled,
  memorialBookProfile: initialMemorialBookProfile,
  petId,
  handleToggle,
}) => {
  const navigate = useNavigate();
  const [petProfile, setPetProfile] = useState(initialPetProfile);
  const [memorialBookProfile, setMemorialBookProfile] = useState(initialMemorialBookProfile);
  const [isLoading, setIsLoading] = useState(true);

  const currentPetId = useSelector((state: RootState) => state.pet.petDetails?.id);

  useEffect(() => {
    const storedPetDetails = sessionStorage.getItem('petDetails');
    const storedMemorialBookDetails = sessionStorage.getItem('memorialBookDetails');

    if (storedPetDetails) {
      const parsedPetDetails = JSON.parse(storedPetDetails);
      if (
        parsedPetDetails &&
        (!petProfile || parsedPetDetails.questIndex !== petProfile.questIndex)
      ) {
        setPetProfile(parsedPetDetails);
      }
    }

    if (storedMemorialBookDetails) {
      const parsedMemorialBookDetails = JSON.parse(storedMemorialBookDetails);
      if (
        parsedMemorialBookDetails &&
        (!memorialBookProfile || parsedMemorialBookDetails.id !== memorialBookProfile.id)
      ) {
        setMemorialBookProfile(parsedMemorialBookDetails);
      }
    }

    setIsLoading(false);
  }, [petId]);

  useEffect(() => {
    if (petProfile) {
      const storedPetDetails = sessionStorage.getItem('petDetails');
      const currentPetDetails = JSON.stringify(petProfile);
      if (currentPetDetails !== storedPetDetails) {
        sessionStorage.setItem('petDetails', currentPetDetails);
      }
    }
  }, [petProfile]);

  useEffect(() => {
    if (memorialBookProfile) {
      const storedMemorialBookDetails = sessionStorage.getItem('memorialBookDetails');
      const currentMemorialBookDetails = JSON.stringify(memorialBookProfile);
      if (currentMemorialBookDetails !== storedMemorialBookDetails) {
        sessionStorage.setItem('memorialBookDetails', currentMemorialBookDetails);
      }
    }
  }, [memorialBookProfile]);

  const handleButtonClick = () => {
    navigate('/earth');
  };

  const handleViewMemorialBookClick = () => {
    if (memorialBookProfile?.isActive && memorialBookProfile?.isOpen) {
      navigate(`/everstar/${petId}/memorialbook/${memorialBookProfile.id}`);
    }
  };

  const handleToggleStatus = (status: 'off' | 'on') => {
    if (handleToggle) {
      handleToggle(status);
      setMemorialBookProfile((prev) => (prev ? { ...prev, isOpen: status === 'on' } : null));
    }
  };

  // toggleStatus 설정
  let toggleStatus: 'off' | 'on' | undefined;
  if (memorialBookProfile && memorialBookProfile.isActive && petId === currentPetId) {
    toggleStatus = memorialBookProfile.isOpen ? 'on' : 'off';
  } else {
    toggleStatus = undefined; // 빈 문자열 대신 undefined로 설정
  }

  const memorialBookUnavailableMessage = !memorialBookProfile
    ? '메모리얼북 정보가 없습니다'
    : !memorialBookProfile.isActive
      ? '아직 활성화되지 않았습니다'
      : !memorialBookProfile.isOpen
        ? '공개되지 않았습니다'
        : '메모리얼북 열람하기';

  // theme 설정: 메시지에 따라 'white' 또는 'focus'로 설정
  const memorialBookTheme =
    !memorialBookProfile || !memorialBookProfile.isActive || !memorialBookProfile.isOpen
      ? 'white'
      : 'focus';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {petProfile ? (
        <ProgressCard
          title={petProfile.name}
          fill={petProfile.questIndex}
          buttonTheme="white"
          buttonSize="large"
          buttonDisabled={false}
          buttonText={'지구별로 가기'}
          buttonIcon="SmallEarthImg"
          onButtonClick={handleButtonClick}
          showMusicControl={true}
          className=""
        />
      ) : (
        <div>Loading...</div>
      )}
      <div className="flex flex-col items-center mt-20">
        <ViewMemorialBook
          theme={memorialBookTheme} // theme을 설정
          size="large"
          disabled={buttonDisabled}
          onClick={handleViewMemorialBookClick}
          BookVariant="book-close"
          showIcon={false}
          toggleStatus={toggleStatus} // toggleStatus에 undefined 설정 가능
          onToggleChange={handleToggleStatus}
        >
          {memorialBookUnavailableMessage}
        </ViewMemorialBook>
      </div>
    </div>
  );
};
